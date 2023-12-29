import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { parkingSpace } from "./schema"
import { z } from "zod"
import { pointSchema } from "./postgisPoint"

export const validationSchemas = {
	parkingSpace: {
		create: z.object({
			// required to work around drizzle-zod not supporting custom types
			...createInsertSchema(parkingSpace).shape,
			coords: pointSchema,
		}),
		select: z.object({
			...createSelectSchema(parkingSpace).shape,
			coords: pointSchema,
		}),
	},
}
