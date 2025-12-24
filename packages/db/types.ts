import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { conversations, messages, users } from "./schema";

/**
 * Type inference for Conversation model
 */
export type Conversation = InferSelectModel<typeof conversations>;
export type NewConversation = InferInsertModel<typeof conversations>;

/**
 * Type inference for Message model
 */
export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>;

/**
 * Type inference for User model
 */
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

/**
 * Sender type derived from schema enum
 */
export type Sender = Message["sender"];
