import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { users } from "@astral-chat/db";

/**
 * Find or create a user by email
 */
export async function findOrCreateUser(email: string) {
    let user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .then((res) => res[0]);

    if (!user) {
        const [newUser] = await db.insert(users).values({ email }).returning();
        user = newUser;
    }

    return user;
}
