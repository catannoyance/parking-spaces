DO $$ BEGIN
 CREATE TYPE "location_type" AS ENUM('linear', 'area');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ownership_type" AS ENUM('municipal', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "payment_type" AS ENUM('free', 'paid', 'conditionally_paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parking_space" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"coords" GEOMETRY(POINT, 4326) NOT NULL,
	"max_slots" integer NOT NULL,
	"paymentType" "payment_type" NOT NULL,
	"ownershipType" "ownership_type" NOT NULL,
	"locationType" "location_type" NOT NULL
);
