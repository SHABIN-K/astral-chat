# @astral-chat/db

Production-grade database package for Astral Chat monorepo.

## 📦 What's Inside

- **Schema definitions** - Drizzle ORM schemas for PostgreSQL
- **Type exports** - Strongly typed models with TypeScript
- **Database client** - Neon HTTP-based connection factory
- **Migrations** - SQL migration files and tooling

---

## 🗂️ Structure

```
packages/db/
├── schema/
│   ├── conversation.schema.ts  # Conversation table
│   ├── message.schema.ts       # Message table with FK
│   └── index.ts                # Schema exports
├── migrations/                 # Generated SQL migrations
├── client.ts                   # Database client factory
├── types.ts                    # TypeScript type definitions
├── index.ts                    # Main entry point
├── drizzle.config.ts          # Drizzle Kit configuration
└── package.json
```

---

## 🚀 Setup

### 1. Set up environment variables

Create a `.env` file in the root of the project:

```bash
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

💡 Get your connection string from [Neon](https://neon.tech)

### 2. Generate migrations

```bash
cd packages/db
bun run db:generate
```

This will create SQL migration files in `migrations/` based on your schema.

### 3. Push to database

```bash
bun run db:push
```

This will apply the schema directly to your database (useful for development).

### 4. (Optional) Run migrations

```bash
bun run db:migrate
```

This applies migration files to the database (for production).

---

## 📘 Usage

### In your API or app

```typescript
import { createDbClient, conversations, messages } from "@astral-chat/db";
import type { Conversation, Message, NewMessage } from "@astral-chat/db";

// Create database client
const db = createDbClient(process.env.DATABASE_URL!);

// Query conversations
const allConversations = await db.select().from(conversations);

// Insert a new message
const newMessage: NewMessage = {
  conversationId: "some-uuid",
  sender: "client",
  content: "Hello!",
};

await db.insert(messages).values(newMessage);
```

---

## 🛠️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `db:generate` | `drizzle-kit generate` | Generate migration files from schema |
| `db:push` | `drizzle-kit push` | Push schema directly to database |
| `db:studio` | `drizzle-kit studio` | Open Drizzle Studio (visual DB editor) |
| `db:migrate` | `drizzle-kit migrate` | Run pending migrations |

---

## 📊 Schema Overview

### Conversations

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | Primary Key, Default Random |
| `createdAt` | Timestamp | Not Null, Default Now |

### Messages

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | Primary Key, Default Random |
| `conversationId` | UUID | Foreign Key → conversations.id, Cascade Delete |
| `sender` | Enum | `"client"` or `"admin"`, Not Null |
| `content` | Text | Not Null |
| `createdAt` | Timestamp | Not Null, Default Now |

---

## 🔗 Exports

```typescript
// Schemas
export { conversations, messages, senderEnum } from "@astral-chat/db";

// Types
export type {
  Conversation,      // Select model
  NewConversation,   // Insert model
  Message,           // Select model
  NewMessage,        // Insert model
  Sender,            // "client" | "admin"
} from "@astral-chat/db";

// Client
export { createDbClient } from "@astral-chat/db";
export type { DbClient } from "@astral-chat/db";
```