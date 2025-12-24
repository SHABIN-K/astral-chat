import { cn } from "../../lib/utils";
import type { Message } from "@astral-chat/sdk";

interface MessageBubbleProps {
    message: Message;
    isMe: boolean;
}

export function MessageBubble({ message, isMe }: MessageBubbleProps) {
    return (
        <div
            className={cn(
                "flex w-full mb-4",
                isMe ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm",
                    isMe
                        ? "bg-brand-600 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                )}
            >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <span
                    className={cn(
                        "text-[10px] mt-1 block opacity-70",
                        isMe ? "text-right" : "text-left"
                    )}
                >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    );
}
