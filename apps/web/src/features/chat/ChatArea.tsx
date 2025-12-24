import { MessageList, ChatInput } from '@astral-chat/ui'
import { MessageSquare } from 'lucide-react'
import type { ConversationWithMetadata } from '../../types'

interface ChatAreaProps {
    conversation: ConversationWithMetadata | undefined
    messages: any[] // Using any for now or import Message type if available
    onSend: (content: string) => void
    isLoading: boolean
    isConnected: boolean
}

export function ChatArea({ conversation, messages, onSend, isLoading, isConnected }: ChatAreaProps) {
    if (!conversation) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gray-50/50">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-10 h-10 text-brand-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Select a conversation</h2>
                <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                    Choose a message from the sidebar to start chatting with your customers in real-time.
                </p>
            </div>
        )
    }

    return (
        <section className="flex-1 flex flex-col bg-white">
            <header className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold">
                        {conversation.customerEmail[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 leading-tight">
                            {conversation.customerEmail}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                            <span className="text-[10px] text-gray-500 font-medium">
                                {isConnected ? 'Real-time sync active' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
                <MessageList
                    messages={messages}
                    currentUserRole="admin"
                />
                <div className="px-8 pb-8 pt-4">
                    <ChatInput
                        onSend={onSend}
                        isLoading={isLoading}
                        placeholder="Type your response as Admin..."
                    />
                </div>
            </div>
        </section>
    )
}
