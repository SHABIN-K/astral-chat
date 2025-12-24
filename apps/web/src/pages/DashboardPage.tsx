import { useState, useEffect } from 'react'
import { api, useChat } from '@astral-chat/sdk'
import { useQuery } from '@tanstack/react-query'
import { Sidebar } from '../features/dashboard/Sidebar'
import { ConversationList } from '../features/chat/ConversationList'
import { ChatArea } from '../features/chat/ChatArea'

export function DashboardPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const { data: conversations = [], isLoading: isLoadingList } = useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            const { data } = await api.conversations.list()
            return data
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    const { messages, sendMessage, isLoading: isLoadingMessages, isConnected } = useChat({
        conversationId: selectedId || undefined,
        sender: 'admin'
    })

    useEffect(() => {
        if (conversations.length > 0 && !selectedId) {
            setSelectedId(conversations[0].id)
        }
    }, [conversations, selectedId])

    const selectedConversation = conversations.find(c => c.id === selectedId)

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            <Sidebar />
            <ConversationList
                conversations={conversations}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isLoading={isLoadingList}
            />
            <ChatArea
                conversation={selectedConversation}
                messages={messages}
                onSend={sendMessage}
                isLoading={isLoadingMessages}
                isConnected={isConnected}
            />
        </div>
    )
}
