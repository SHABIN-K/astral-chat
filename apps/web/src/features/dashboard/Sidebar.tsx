import { LayoutDashboard, Users, Settings } from 'lucide-react'

export function Sidebar() {
    return (
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
    )
}
