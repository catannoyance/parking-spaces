import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { validationSchemas } from "@parkingspaces/db/validation"

const c = initContract()

export const contract = c.router(
	{
		getParkingSpaces: c.query({
			path: "/parking-spaces",
			method: "GET",
			responses: {
				200: z.array(validationSchemas.parkingSpace.select),
			},
		}),

		getParkingSpace: c.query({
			path: "/parking-space/:id",
			method: "GET",
			pathParams: z.object({
				id: z.string().transform(Number),
			}),
			responses: {
				200: validationSchemas.parkingSpace.select,
				404: z.undefined(),
			},
		}),

		createParkingSpace: c.mutation({
			path: "/parking-space",
			method: "POST",
			body: validationSchemas.parkingSpace.create,
			responses: {
				200: validationSchemas.parkingSpace.select,
				404: z.undefined(),
			},
		}),

		updateParkingSpace: c.mutation({
			path: "/parking-space/:id",
			method: "PATCH",
			pathParams: z.object({
				id: z.string().transform(Number),
			}),
			body: validationSchemas.parkingSpace.create.partial(),
			responses: {
				200: validationSchemas.parkingSpace.select,
				404: z.undefined(),
			},
		}),

		deleteParkingSpace: c.mutation({
			path: "/parking-space/:id",
			method: "DELETE",
			pathParams: z.object({
				id: z.string().transform(Number),
			}),
			body: z.object({}),
			responses: {
				200: validationSchemas.parkingSpace.select,
				404: z.undefined(),
			},
		}),
	},
	{
		strictStatusCodes: true,
	},
)
