import { createDbClient } from "@astral-chat/db";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined");
}

export const db = createDbClient(process.env.DATABASE_URL);
