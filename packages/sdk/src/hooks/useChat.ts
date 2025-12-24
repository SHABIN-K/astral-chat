import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { api } from "../api/client";
import { useWebSocket } from "./useWebSocket";
import type { Message } from "../types";

interface UseChatOptions {
    conversationId?: string;
    sender: "client" | "admin";
}

export function useChat({ conversationId, sender }: UseChatOptions) {
    const queryClient = useQueryClient();
    const { isConnected, lastMessage } = useWebSocket(conversationId);

    const queryKey = useMemo(() => ["messages", conversationId], [conversationId]);

    // Load message history
    const {
        data: messages = [],
        isLoading,
        error: queryError,
        refetch,
    } = useQuery({
        queryKey,
        queryFn: async () => {
            if (!conversationId) return [];
            const { data } = await api.messages.list(conversationId);
            return data;
        },
        enabled: !!conversationId,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    // Handle incoming real-time messages
    useEffect(() => {
        if (lastMessage?.type === "NEW_MESSAGE") {
            const newMsg = lastMessage.data as Message;

            queryClient.setQueryData<Message[]>(queryKey, (old) => {
                const current = old || [];
                // Prevent duplicate messages
                if (current.some((m) => m.id === newMsg.id)) return current;
                return [...current, newMsg];
            });
        }
    }, [lastMessage, queryClient, queryKey]);

    // Send message with optimistic UI
    const { mutate: sendMessage, error: mutationError } = useMutation({
        mutationFn: async (content: string) => {
            if (!conversationId || !content.trim()) throw new Error("Invalid message");
            return api.messages.send({
                conversationId,
                sender,
                content,
            });
        },
        onMutate: async (content) => {
            if (!conversationId || !content.trim()) return;
            await queryClient.cancelQueries({ queryKey });

            const previousMessages = queryClient.getQueryData<Message[]>(queryKey);

            const optimisticMessage: Message = {
                id: crypto.randomUUID(),
                conversationId,
                content,
                sender,
                createdAt: new Date(),
            };

            queryClient.setQueryData<Message[]>(queryKey, (old: Message[] | undefined) => [
                ...(old || []),
                optimisticMessage,
            ]);

            return { previousMessages, optimisticMessageId: optimisticMessage.id };
        },
        onError: (_err, _content, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(queryKey, context.previousMessages);
            }
        },
        onSuccess: (savedMsg, _content, context) => {
            if (!context) return;
            queryClient.setQueryData<Message[]>(queryKey, (old) => {
                const current = old || [];
                const exists = current.some((m) => m.id === savedMsg.id);
                if (exists) {
                    // Remove optimistic message if real one exists
                    return current.filter((m) => m.id !== context.optimisticMessageId);
                }
                return current.map((m) => (m.id === context.optimisticMessageId ? savedMsg : m));
            });
        },
    });

    const error = (queryError as any)?.message || (mutationError as any)?.message || null;

    return {
        messages,
        isLoading,
        isConnected,
        error,
        sendMessage,
        loadMore: refetch,
    };
}
