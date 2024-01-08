import express from "express"
import morgan from "morgan"
import { contract } from "@parkingspaces/api-contract"
import { initServer, createExpressEndpoints } from "@ts-rest/express"
import { generateOpenApi } from "@ts-rest/open-api"
import * as swaggerUi from "swagger-ui-express"
import { createDbClient } from "./db"
import { parkingSpace } from "@parkingspaces/db/schema"
import { Point } from "@parkingspaces/db/types"
import { eq, sql } from "drizzle-orm"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

if (!process.env.DB_CONNECTION_STRING) {
	throw new Error("DB_CONNECTION_STRING env variable is not set")
}

const db = createDbClient()

const app = express()


app.use(
	cors({
		origin: "*",
	}),
)

app.use(express.json())

app.use(morgan("combined"))

const s = initServer()

const selectParkingSpace = () => ({
	id: parkingSpace.id,
	name: parkingSpace.name,
	address: parkingSpace.address,
	coords: sql<Point>`ST_AsText(${parkingSpace.coords})`.mapWith(parkingSpace.coords),
	maxSlots: parkingSpace.maxSlots,
	locationType: parkingSpace.locationType,
	paymentType: parkingSpace.paymentType,
	ownershipType: parkingSpace.ownershipType,
	conditionallyPaidSchedule: parkingSpace.conditionallyPaidSchedule,
})

const router = s.router(contract, {
	createParkingSpace: async ctx => ({
		status: 200,
		body: (
			await db
				.insert(parkingSpace)
				.values(ctx.body)
				.returning(selectParkingSpace())
				.execute()
		)[0],
	}),

	getParkingSpace: async ctx => {
		const result = await db
			.select(selectParkingSpace())
			.from(parkingSpace)
			.where(eq(parkingSpace.id, ctx.params.id))
			.execute()

		if (result.length === 0) {
			return {
				status: 404,
			}
		}

		return {
			status: 200,
			body: result[0],
		}
	},

	getParkingSpaces: async _ctx => ({
		status: 200,
		body: await db.select(selectParkingSpace()).from(parkingSpace).execute(),
	}),

	updateParkingSpace: async ctx => {
		const result = await db
			.update(parkingSpace)
			.set(ctx.body)
			.where(eq(parkingSpace.id, ctx.params.id))
			.returning(selectParkingSpace())
			.execute()

		if (result.length === 0) {
			return {
				status: 404,
			}
		}

		return {
			status: 200,
			body: result[0],
		}
	},

	deleteParkingSpace: async ctx => {
		const result = await db
			.delete(parkingSpace)
			.where(eq(parkingSpace.id, ctx.params.id))
			.returning(selectParkingSpace())
			.execute()

		if (result.length === 0) {
			return {
				status: 404,
			}
		}

		return {
			status: 200,
			body: result[0],
		}
	},
})

createExpressEndpoints(contract, router, app)

const openApiDocument = generateOpenApi(
	contract,
	{
		info: {
			title: "Parking Spaces",
			version: "1.0.0",
		},
	},
	{
		setOperationId: true,
	},
)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument))

app.listen(8000, () => {
	console.log("Listening on port 8000")
})
