import { Elysia } from "elysia";
import { saveMessage, getMessages } from "../services/message.service";
import { sendMessageBody, getMessagesQuery } from "../schemas/message.schema";
import { broadcast } from "../lib/ws.manager";

export const messageController = new Elysia({ prefix: "/messages" })
    // Send Message
    .post(
        "/",
        async ({ body }) => {
            const message = await saveMessage({
                conversationId: body.conversationId,
                sender: body.sender,
                content: body.content,
            });

            // Broadcast via WS
            broadcast(body.conversationId, {
                type: "NEW_MESSAGE",
                data: message,
            });

            return message;
        },
        { body: sendMessageBody }
    )

    // Get Messages
    .get(
        "/",
        async ({ query }) => {
            const messages = await getMessages(
                query.conversationId,
                query.limit,
                query.cursor
            );
            return { data: messages };
        },
        { query: getMessagesQuery }
    );
