import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "@astral-chat/sdk";

interface MessageListProps {
    messages: Message[];
    currentUserId?: string;
    currentUserRole: "client" | "admin";
}

export function MessageList({ messages, currentUserRole }: MessageListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar space-y-2"
        >
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
                    No messages yet. Start the conversation!
                </div>
            ) : (
                messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isMe={message.sender === currentUserRole}
                    />
                ))
            )}
        </div>
    );
}
