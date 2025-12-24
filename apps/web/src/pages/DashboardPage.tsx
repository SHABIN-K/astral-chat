import { useState, useEffect } from 'react'
import { api, useChat } from '@astral-chat/sdk'
import { Sidebar } from '../features/dashboard/Sidebar'
import { ConversationList } from '../features/chat/ConversationList'
import { ChatArea } from '../features/chat/ChatArea'
import type { ConversationWithMetadata } from '../types'

export function DashboardPage() {
    const [conversations, setConversations] = useState<ConversationWithMetadata[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isLoadingList, setIsLoadingList] = useState(false)

    // Setup chat hook
    const { messages, sendMessage, isLoading: isLoadingMessages, isConnected } = useChat({
        conversationId: selectedId || undefined,
        sender: 'admin'
    })

    // Fetch conversations
    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoadingList(true)
            try {
                const { data } = await api.conversations.list()
                setConversations(data)
                if (data.length > 0 && !selectedId) {
                    setSelectedId(data[0].id)
                }
            } catch (err) {
                console.error('Failed to fetch conversations', err)
            } finally {
                setIsLoadingList(false)
            }
        }
        fetchConversations()
    }, [])

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
