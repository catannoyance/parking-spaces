import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

import dotenv from "dotenv"

dotenv.config()

if (!process.env.DB_CONNECTION_STRING) {
	throw new Error("DB_CONNECTION_STRING env variable is not set")
}

const sql = postgres(process.env.DB_CONNECTION_STRING, { max: 1 })
const db = drizzle(sql)

await migrate(db, { migrationsFolder: "./db-migrations" })
await sql.end()
