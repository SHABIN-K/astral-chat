import type { StartSessionResponse, Message } from "../types";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "An error occurred" }));
        throw new Error(error.message || response.statusText);
    }

    return response.json();
}

export const api = {
    auth: {
        startSession: (email: string) =>
            request<StartSessionResponse>("/auth/session", {
                method: "POST",
                body: JSON.stringify({ email }),
            }),
    },
    messages: {
        send: (data: { conversationId: string; sender: "client" | "admin"; content: string }) =>
            request<Message>("/messages", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        list: (conversationId: string, cursor?: string, limit = 50) => {
            const params = new URLSearchParams({ conversationId, limit: limit.toString() });
            if (cursor) params.append("cursor", cursor);
            return request<{ data: Message[] }>(`/messages?${params.toString()}`);
        },
    },
    conversations: {
        list: () => request<{ data: any[] }>("/conversations"),
    },
};
