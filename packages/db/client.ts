import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export function createDbClient(connectionString: string) {
    const sql = neon(connectionString);
    return drizzle(sql, { schema });
}

export type DbClient = ReturnType<typeof createDbClient>;
