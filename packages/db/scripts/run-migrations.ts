import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import config from "../drizzle.config";
import postgres from "postgres";

const connectionString = config.dbCredentials.connectionString;

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "./db-migrations" });
await sql.end();
