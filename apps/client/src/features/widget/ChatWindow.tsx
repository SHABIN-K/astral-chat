import { X } from "lucide-react";

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    isConnected: boolean;
    children: React.ReactNode;
}

export function ChatWindow({ isOpen, onClose, isConnected, children }: ChatWindowProps) {
    if (!isOpen) return null;

    return (
        <div className="mb-4 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="bg-brand-600 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                        AC
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Astral Support</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div
                                className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-400"
                                    }`}
                            />
                            <span className="text-[10px] opacity-80">
                                {isConnected ? "Online" : "Reconnecting..."}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 flex flex-col bg-gray-50/50">{children}</div>
        </div>
    );
}
