import { useState, useCallback } from "react";
import { api, useChat } from "@astral-chat/sdk";

import Balatro from "./components/Balatro/Balatro";
import { ToggleButton } from "./components/ToggleButton";
import { ActiveChat } from "./features/widget/ActiveChat";
import { ChatWindow } from "./features/widget/ChatWindow";
import { SessionStartForm } from "./features/widget/SessionStartForm";

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    const [session, setSession] = useState<{ userId: string; conversationId: string } | null>(null);

    // Chat hook handles messages, connection status, and sending
    const { messages, sendMessage, isLoading, isConnected } = useChat({
        conversationId: session?.conversationId,
        sender: "client",
    });

    const handleStartSession = useCallback(async (email: string) => {
        setIsStarting(true);
        try {
            const data = await api.auth.startSession(email);
            setSession(data);
        } catch (err) {
            console.error("Failed to start session", err);
            alert("Could not start chat. Please check your connection.");
        } finally {
            setIsStarting(false);
        }
    }, []);

    return (
        <>
            <div className="fixed inset-0 z-0">
                <Balatro
                    isRotate={true}
                    mouseInteraction={true}
                    pixelFilter={2000}
                />
            </div>

            <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
                <div className="text-center space-y-2">
                    <h1 className="text-7xl font-black text-white tracking-tighter mix-blend-overlay opacity-90">
                        Astral Chat
                    </h1>
                    <p className="text-lg text-white/60 font-medium tracking-[0.2em] uppercase">
                        Next Gen Support
                    </p>
                </div>
            </div>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
                <div className="pointer-events-auto">
                    <ChatWindow
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        isConnected={isConnected}
                    >
                        {!session ? (
                            <SessionStartForm onSubmit={handleStartSession} isLoading={isStarting} />
                        ) : (
                            <ActiveChat
                                messages={messages}
                                isLoading={isLoading}
                                onSend={sendMessage}
                            />
                        )}
                    </ChatWindow>
                </div>
                <div className="pointer-events-auto mt-4">
                    <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                </div>
            </div>
        </>
    );
}
