import { customType } from "drizzle-orm/pg-core";
import { z } from "zod";

export const pointSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
})

export type Point = z.infer<typeof pointSchema>;

export const postgisPoint = customType<{
	data: Point;
	driverData: string;
}>({
	dataType() {
		return `GEOMETRY(POINT, 4326)`;
	},
	toDriver(value: Point): string {
		return `SRID=4326;POINT(${value.longitude} ${value.latitude})`;
	},
	fromDriver(value: string): Point {
		const matches = value.match(/POINT\((?<longitude>[\d.-]+) (?<latitude>[\d.-]+)\)/);
		const { longitude, latitude } = matches!.groups!;

		return {
			longitude: parseFloat(longitude),
			latitude: parseFloat(latitude),
		};
	},
});
