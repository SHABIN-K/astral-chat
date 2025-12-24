import { db } from "../lib/db";
import { conversations, users } from "@astral-chat/db";
import { eq, desc } from "drizzle-orm";

/**
 * Returns the most recent conversation for a customer,
 * or creates a new one if none exists.
 */
export async function getOrCreateConversation(customerId: string) {
    const existing = await db.query.conversations.findFirst({
        where: eq(conversations.customerId, customerId),
    });

    if (existing) return existing;

    const [conversation] = await db
        .insert(conversations)
        .values({ customerId })
        .returning();

    if (!conversation) {
        throw new Error("Failed to create conversation");
    }

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
