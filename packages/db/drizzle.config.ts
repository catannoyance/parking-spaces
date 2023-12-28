import type { Config } from "drizzle-kit";

export default {
	schema: "./src/schema.ts",
	out: "./db-migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
	},
} satisfies Config;
