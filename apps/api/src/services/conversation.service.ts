import { db } from "../lib/db";
import { conversations, users, messages } from "@astral-chat/db";
import { eq, desc, sql } from "drizzle-orm";

/**
 * Create a new conversation for a user
 */
export async function createConversation(userId: string) {
    const [conversation] = await db
        .insert(conversations)
        .values({ customerId: userId })
        .returning();
    return conversation;
}

/**
 * List all conversations with their owner email and last message
 */
export async function listConversations() {
    const result = await db
        .select({
            id: conversations.id,
            createdAt: conversations.createdAt,
            customerEmail: users.email,
        })
        .from(conversations)
        .innerJoin(users, eq(conversations.customerId, users.id))
        .orderBy(desc(conversations.createdAt));

    return result;
}
