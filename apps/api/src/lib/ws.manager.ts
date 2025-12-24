import type { ElysiaWS } from "elysia/ws";

type WSClient = ElysiaWS<any>;

const rooms = new Map<string, Set<WSClient>>();

/**
 * Subscribes a client to a conversation room
 */
export function joinRoom(ws: WSClient, conversationId: string) {
    if (!rooms.has(conversationId)) {
        rooms.set(conversationId, new Set());
    }
    rooms.get(conversationId)?.add(ws);
}

/**
 * Unsubscribes a client from a room
 */
export function leaveRoom(ws: WSClient, conversationId: string) {
    const room = rooms.get(conversationId);
    if (room) {
        room.delete(ws);
        if (room.size === 0) {
            rooms.delete(conversationId);
        }
    }
}

/**
 * Broadcasts a payload to all clients in a conversation room
 */
export function broadcast(conversationId: string, payload: any) {
    const room = rooms.get(conversationId);
    if (room) {
        room.forEach((ws) => {
            try {
                ws.send(payload);
            } catch (e) {
                console.error("WS Broadcast Error", e);
            }
        });
    }
}
