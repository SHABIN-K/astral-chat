import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const conversations = pgTable("conversations", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
