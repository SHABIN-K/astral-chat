import { Elysia } from "elysia";
import { listConversations } from "../services/conversation.service";

export const conversationController = new Elysia({ prefix: "/conversations" })
    .get("/", async () => {
        const list = await listConversations();
        return { data: list };
    });
