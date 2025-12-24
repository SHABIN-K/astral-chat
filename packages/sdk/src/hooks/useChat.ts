import { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "../api/client";
import { useWebSocket } from "./useWebSocket";
import type { Message } from "../types";

interface UseChatOptions {
    conversationId?: string;
    userId?: string;
    sender: "client" | "admin";
}

export function useChat({ conversationId, userId, sender }: UseChatOptions) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { isConnected, lastMessage } = useWebSocket(conversationId);

    // Load message history
    const loadHistory = useCallback(async () => {
        if (!conversationId) return;
        setIsLoading(true);
        try {
            const { data } = await api.messages.list(conversationId);
            setMessages(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [conversationId]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    // Handle incoming real-time messages
    useEffect(() => {
        if (lastMessage?.type === "NEW_MESSAGE") {
            const newMsg = lastMessage.data as Message;

            setMessages((prev) => {
                // Prevent duplicate messages (e.g. if we get it via WS and we just sent it)
                const exists = prev.some((m) => m.id === newMsg.id);
                if (exists) return prev;
                return [...prev, newMsg];
            });
        }
    }, [lastMessage]);

    // Send message with optimistic UI
    const sendMessage = useCallback(async (content: string) => {
        if (!conversationId || !content.trim()) return;

        // Optimistic message
        const optimisticMessage: Message = {
            id: crypto.randomUUID(),
            conversationId,
            content,
            sender,
            createdAt: new Date(),
        };

        setMessages((prev) => [...prev, optimisticMessage]);

        try {
            const savedMsg = await api.messages.send({
                conversationId,
                sender,
                content,
            });

            // Update the optimistic message with the real one from DB
            setMessages((prev) =>
                prev.map((m) => (m.id === optimisticMessage.id ? savedMsg : m))
            );
        } catch (err: any) {
            // Revert optimistic update on error
            setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
            setError(err.message);
        }
    }, [conversationId, sender]);

    return {
        messages,
        isLoading,
        isConnected,
        error,
        sendMessage,
        loadMore: loadHistory, // Simplified for now, can be extended for cursor pagination
    };
}
