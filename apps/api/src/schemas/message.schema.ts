import { t } from "elysia";

export const sendMessageBody = t.Object({
    conversationId: t.String({ format: "uuid" }),
    sender: t.Union([t.Literal("client"), t.Literal("admin")]),
    content: t.String({ minLength: 1 }),
});

export const getMessagesQuery = t.Object({
    conversationId: t.String({ format: "uuid" }),
    cursor: t.Optional(t.String()),
    limit: t.Optional(t.Numeric({ default: 50 })),
});
