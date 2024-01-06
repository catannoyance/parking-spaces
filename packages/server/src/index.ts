import express from "express"
import morgan from "morgan"
import { contract } from "@parkingspaces/api-contract"
import { initServer, createExpressEndpoints } from "@ts-rest/express"
import { db } from "./db"
import { parkingSpace } from "@parkingspaces/db/schema"
import { Point } from "@parkingspaces/db/types"
import { eq, sql } from "drizzle-orm"
import cors from "cors"
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
})

createExpressEndpoints(contract, router, app)

app.listen(8000, () => {
	console.log("Listening on port 8000")
})
