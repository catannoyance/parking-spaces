import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

export const createDbClient = () => drizzle(postgres(process.env.DB_CONNECTION_STRING!))
