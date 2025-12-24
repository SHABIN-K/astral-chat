import { useState, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading?: boolean;
    placeholder?: string;
}

export function ChatInput({
    onSend,
    isLoading,
    placeholder = "Type a message...",
}: ChatInputProps) {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (value.trim() && !isLoading) {
            onSend(value.trim());
            setValue("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        // Auto-resize textarea
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 p-4 bg-white"
        >
            <div className="relative flex items-end gap-2 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm py-2 px-2 resize-none max-h-32 custom-scrollbar"
                />
                <button
                    type="submit"
                    disabled={!value.trim() || isLoading}
                    className={cn(
                        "p-2 rounded-xl transition-all",
                        value.trim() && !isLoading
                            ? "bg-brand-600 text-white hover:bg-brand-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                >
                    <SendHorizontal className="w-5 h-5" />
                </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 px-2">
                Press Enter to send, Shift + Enter for new line.
            </p>
        </form>
    );
}
