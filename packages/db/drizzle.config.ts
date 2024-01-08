import type { Config } from "drizzle-kit"

import dotenv from "dotenv"

dotenv.config()

if (!process.env.DB_CONNECTION_STRING) {
	throw new Error("DB_CONNECTION_STRING env variable is not set")
}

export default {
	schema: "./src/schema.ts",
	out: "./db-migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DB_CONNECTION_STRING,
	},
} satisfies Config
