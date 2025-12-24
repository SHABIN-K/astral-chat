import { useEffect, useRef, useState, useCallback } from "react";
import type { WSEvent } from "../types";

// const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000/ws";
const WS_URL = "ws://localhost:3000/ws";

export function useWebSocket(conversationId?: string) {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<WSEvent | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const connect = useCallback(() => {
        if (!conversationId) return;

        if (socketRef.current?.readyState === WebSocket.OPEN) return;

        const socket = new WebSocket(WS_URL);
        socketRef.current = socket;

        socket.onopen = () => {
            setIsConnected(true);
            console.log("WS Connected");
            // Join the conversation room
            socket.send(JSON.stringify({ type: "JOIN", conversationId }));
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as WSEvent;
                setLastMessage(data);
            } catch (e) {
                console.error("Failed to parse WS message", e);
            }
        };

        socket.onclose = () => {
            setIsConnected(false);
            console.log("WS Disconnected, reconnecting...");
            reconnectTimeoutRef.current = setTimeout(connect, 3000);
        };

        socket.onerror = (error) => {
            console.error("WS Error", error);
            socket.close();
        };
    }, [conversationId]);

    useEffect(() => {
        connect();

        return () => {
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
            if (socketRef.current) {
                socketRef.current.onclose = null; // Prevent reconnect on intentional unmount
                socketRef.current.close();
            }
        };
    }, [connect]);

    const sendMessage = useCallback((payload: any) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(payload));
        }
    }, []);

    return { isConnected, lastMessage, sendMessage };
}
