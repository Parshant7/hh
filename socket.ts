import {Server} from "socket.io";
import { initializeChatSocket } from "./src/sockets/chat.socket";
import { socketAuthorization } from "./src/middlewares/authorization";
export const initializeSocket = (server: any) => {
    const io = new Server(server);
    io.use(socketAuthorization);
    initializeChatSocket(io);
    return io;
}