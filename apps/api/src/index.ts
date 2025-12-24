import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authController } from "./controllers/auth.controller";
import { messageController } from "./controllers/message.controller";
import { conversationController } from "./controllers/conversation.controller";
import { wsController } from "./controllers/ws.controller";

const app = new Elysia()
    .use(cors())
    .use(authController)
    .use(messageController)
    .use(conversationController)
    .use(wsController)
    .listen(3000);

console.log(
    `🦊 Astral Chat API is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
