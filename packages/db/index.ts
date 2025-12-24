export * from "./schema";

// Re-export types for convenience
export type {
    Conversation,
    NewConversation,
    Message,
    NewMessage,
    Sender,
    User,
    NewUser,
} from "./types";

// Export database client utilities
export { createDbClient } from "./client";
export type { DbClient } from "./client";
