import { InferSelectModel } from "drizzle-orm"
import { parkingSpace } from "./schema"

export type { Point } from "./postgisPoint"
export type ParkingSpace = InferSelectModel<typeof parkingSpace>
