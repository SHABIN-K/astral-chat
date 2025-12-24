import { useState } from "react";
import { Send } from "lucide-react";

interface SessionStartFormProps {
    onSubmit: (email: string) => Promise<void> | void;
    isLoading: boolean;
}

export function SessionStartForm({ onSubmit, isLoading }: SessionStartFormProps) {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            onSubmit(email);
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center px-8 py-10">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome! 👋</h2>
                <p className="text-gray-500 text-sm">
                    Enter your email for a personalized support experience.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all text-sm outline-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2 group"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Start Chatting
                            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
