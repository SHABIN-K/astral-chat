import { Elysia } from "elysia";
import { findOrCreateUser } from "../services/auth.service";
import { getOrCreateConversation } from "../services/conversation.service";
import { startSessionBody } from "../schemas/auth.schema";

export const authController = new Elysia({ prefix: "/auth" })
    .post(
        "/session",
        async ({ body }) => {
            const user = await findOrCreateUser(body.email);
            const conversation = await getOrCreateConversation(user.id);

            return {
                userId: user.id,
                conversationId: conversation.id,
            };
        },
        { body: startSessionBody }
    );
