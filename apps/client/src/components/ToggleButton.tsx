import { MessageCircle, X } from "lucide-react";

interface ToggleButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export function ToggleButton({ isOpen, onClick }: ToggleButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`w-20 h-20 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 ${isOpen
                ? "bg-gray-100 text-gray-600 rotate-90"
                : "bg-brand-600 text-white"
                }`}
        >
            {isOpen ? <X className="w-10 h-10" /> : <MessageCircle className="w-10 h-10" />}
        </button>
    );
}
