import { eq, and, lt, desc } from "drizzle-orm";
import { db } from "../lib/db";
import { messages } from "@astral-chat/db";
import type { NewMessage } from "@astral-chat/db";

/**
 * Save a message to DB
 */
export async function saveMessage(data: { conversationId: string; sender: "client" | "admin"; content: string }) {
    const newMessage: NewMessage = {
        conversationId: data.conversationId,
        sender: data.sender,
        content: data.content,
    };

    const [savedMsg] = await db.insert(messages).values(newMessage).returning();
    return savedMsg;
}

/**
 * Get messages with cursor pagination
 */
export async function getMessages(conversationId: string, limit = 50, cursor?: string) {
    const query = db
        .select()
        .from(messages)
        .where(
            and(
                eq(messages.conversationId, conversationId),
                cursor ? lt(messages.createdAt, new Date(cursor)) : undefined
            )
        )
        .orderBy(desc(messages.createdAt))
        .limit(limit);

    const result = await query;
    return result.reverse();
}
