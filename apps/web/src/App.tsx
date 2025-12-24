import { useState, useEffect } from 'react'
import { api, useChat } from '@astral-chat/sdk'
import { MessageList, ChatInput } from '@astral-chat/ui'
import { Users, Search, MessageSquare, LayoutDashboard, Settings } from 'lucide-react'

interface ConversationWithMetadata {
    id: string
    createdAt: string
    customerEmail: string
}

export default function App() {
    const [conversations, setConversations] = useState<ConversationWithMetadata[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [isLoadingList, setIsLoadingList] = useState(false)

    const { messages, sendMessage, isLoading: isLoadingMessages, isConnected } = useChat({
        conversationId: selectedId || undefined,
        sender: 'admin'
    })

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
            {/* Sidebar Navigation */}
            <aside className="w-20 bg-brand-900 flex flex-col items-center py-6 gap-8 text-white/50">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4">
                    A
                </div>
                <button className="p-3 hover:bg-white/10 rounded-xl transition-all text-white bg-white/10 shadow-lg">
                    <LayoutDashboard className="w-6 h-6" />
                </button>
                <button className="p-3 hover:bg-white/10 rounded-xl transition-all">
                    <Users className="w-6 h-6" />
                </button>
                <button className="p-3 hover:bg-white/10 rounded-xl transition-all">
                    <Settings className="w-6 h-6" />
                </button>
            </aside>

            {/* Conversations List */}
            <main className="w-96 bg-white border-r border-gray-100 flex flex-col">
                <header className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900 mb-4">Conversations</h1>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl border-none text-sm focus:ring-2 focus:ring-brand-500/20 transition-all outline-none"
                        />
                    </div>
                </header>

                <section className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                    {isLoadingList ? (
                        <div className="flex justify-center p-8">
                            <div className="w-6 h-6 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
                        </div>
                    ) : conversations.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <p className="text-sm text-gray-500">No active conversations</p>
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedId(conv.id)}
                                className={`w-full px-6 py-4 flex flex-col gap-1 transition-all border-l-4 ${selectedId === conv.id
                                    ? "bg-brand-50 border-brand-600 shadow-sm"
                                    : "border-transparent hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex justify-between items-start w-full">
                                    <span className={`text-sm font-semibold truncate ${selectedId === conv.id ? 'text-brand-900' : 'text-gray-900'}`}>
                                        {conv.customerEmail}
                                    </span>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                        {new Date(conv.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 truncate w-full text-left">
                                    Last active session...
                                </p>
                            </button>
                        ))
                    )}
                </section>
            </main>

            {/* Chat Area */}
            <section className="flex-1 flex flex-col bg-white">
                {selectedConversation ? (
                    <>
                        <header className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold">
                                    {selectedConversation.customerEmail[0].toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-900 leading-tight">
                                        {selectedConversation.customerEmail}
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
                                    onSend={sendMessage}
                                    isLoading={isLoadingMessages}
                                    placeholder="Type your response as Admin..."
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gray-50/50">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
                            <MessageSquare className="w-10 h-10 text-brand-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Select a conversation</h2>
                        <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                            Choose a message from the sidebar to start chatting with your customers in real-time.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
