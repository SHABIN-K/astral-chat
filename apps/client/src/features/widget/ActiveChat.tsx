import { MessageList, ChatInput } from "@astral-chat/ui";
import { Message } from "@astral-chat/sdk";

interface ActiveChatProps {
    messages: Message[];
    isLoading: boolean;
    onSend: (message: string) => void;
}

export function ActiveChat({ messages, isLoading, onSend }: ActiveChatProps) {
    return (
        <>
            <MessageList messages={messages} currentUserRole="client" />
            <ChatInput onSend={onSend} isLoading={isLoading} />
        </>
    );
}
