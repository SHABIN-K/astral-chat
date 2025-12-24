import type { User, Conversation, Message, NewMessage } from "@astral-chat/db";

export type { User, Conversation, Message, NewMessage };

export interface StartSessionResponse {
    userId: string;
    conversationId: string;
}

export interface WSEvent {
    type: "NEW_MESSAGE" | "JOINED";
    data?: any;
    conversationId?: string;
}
