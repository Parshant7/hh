import {Server} from "socket.io";
import { initializeChatSocket } from "./src/sockets/chat.socket";
export const initializeSocket = (server: any) => {
    const io = new Server(server);
    initializeChatSocket(io);
    return io;
}