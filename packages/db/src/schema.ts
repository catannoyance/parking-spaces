import { serial, text, pgTable, pgEnum, integer } from "drizzle-orm/pg-core"
import { postgisPoint } from "./postgisPoint"

export const paymentTypeEnum = pgEnum("payment_type", [
	"free",
	"paid",
	"conditionally_paid",
])
export const ownershipTypeEnum = pgEnum("ownership_type", ["municipal", "private"])
export const locationTypeEnum = pgEnum("location_type", ["linear", "area"])

export const parkingSpace = pgTable("parking_space", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	address: text("address").notNull(),
	coords: postgisPoint("coords").notNull(),
	maxSlots: integer("max_slots").notNull(),
	paymentType: paymentTypeEnum("paymentType").notNull(),
	ownershipType: ownershipTypeEnum("ownershipType").notNull(),
	locationType: locationTypeEnum("locationType").notNull(),
})
