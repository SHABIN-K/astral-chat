import { Search, MessageSquare } from 'lucide-react'
import type { ConversationWithMetadata } from '../../types'

interface ConversationListProps {
    conversations: ConversationWithMetadata[]
    selectedId: string | null
    onSelect: (id: string) => void
    isLoading: boolean
}

export function ConversationList({ conversations, selectedId, onSelect, isLoading }: ConversationListProps) {
    return (
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
                {isLoading ? (
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
                            onClick={() => onSelect(conv.id)}
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
    )
}
