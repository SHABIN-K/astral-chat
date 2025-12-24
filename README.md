# Astral Chat

A real-time, production-grade customer support chat application built with a modern high-performance stack. This monorepo includes a backend API, a customer-facing chat widget, and an admin dashboard.

## 🚀 Tech Stack

- **Runtime**: [Bun](https://bun.sh) (Fast all-in-one JavaScript runtime)
- **Monorepo**: Bun Workspaces
- **Backend**: [ElysiaJS](https://elysiajs.com) (High-performance web framework)
- **Database**: PostgreSQL (via Neon) managed by [Drizzle ORM](https://orm.drizzle.team)
- **Frontend**: React + Vite + TailwindCSS
- **State/Fetching**: TanStack Query (React Query)
- **Real-time**: Native WebSockets

## 📂 Project Structure

```
.
├── apps/
│   ├── api/        # ElysiaJS Backend & WebSocket Server
│   ├── client/     # Customer Chat Widget (Embeddable)
│   └── web/        # Admin Dashboard
└── packages/
    ├── db/         # Drizzle Schema & DB Connection
    ├── sdk/        # Shared Type-Safe API Client & Hooks
    └── ui/         # Shared UI Components
```

## 🛠️ Setup Instructions

### Prerequisites
- [Bun](https://bun.sh) installed (`curl -fsSL https://bun.sh/install | bash`)
- A PostgreSQL database URL (e.g., from [Neon.tech](https://neon.tech))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd astral-chat
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
    ```

4.  **Database Setup:**
    Push the schema to your database:
    ```bash
    bun run db:push
    ```

### Running the App

Run all services (API, Client, Web) simultaneously:
```bash
bun dev
```

- **API**: [http://localhost:3000](http://localhost:3000)
- **Client Widget**: [http://localhost:5173](http://localhost:5173) (Port may vary)
- **Admin Dashboard**: [http://localhost:5174](http://localhost:5174) (Port may vary)
