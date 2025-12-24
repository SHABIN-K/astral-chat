import { Elysia } from "elysia";
import { joinRoom } from "../lib/ws.manager";

export const wsController = new Elysia()
    .ws("/ws", {
        open(ws) {
            // ws handle
        },
        message(ws, message: any) {
            if (message.type === "JOIN" && message.conversationId) {
                joinRoom(ws, message.conversationId);
                ws.send({ type: "JOINED", conversationId: message.conversationId });
            }
        },
        close(ws) {
            // Cleanup
        }
    });
