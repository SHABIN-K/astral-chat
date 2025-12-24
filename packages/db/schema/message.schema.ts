import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { conversations } from "./conversation.schema";

/**
 * Sender enum for message sender type
 */
export const senderEnum = pgEnum("sender", ["client", "admin"]);

export const messages = pgTable("messages", {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
        .notNull()
        .references(() => conversations.id, { onDelete: "cascade" }),
    sender: senderEnum("sender").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
