import {Server} from "socket.io";
import { socketAuthorization } from "../middlewares/authorization";
import { ISendMessage } from "../interfaces/chat.interface";
import { createMessage, findOrCreateChat, getAllChats, getAllMessages, getAvailableUsers, getChatIds } from "../services/chatService";

export const initializeChatSocket = (io:Server) => {
    io.on("connection", async(socket)=>{
        //join to chat sockets
        const chatIds = await getChatIds(socket.userData?.id);
        socket.join([...chatIds, socket.userData?.id]);

        socket.on('sendMessage',async (payload: ISendMessage)=>{
            console.log("inside send message ", payload);
            const userId = socket.userData?.id;
            const chat = await findOrCreateChat(payload.sentTo, userId);
            console.log("chatss ",chat);
            const newMessage = await createMessage(payload, userId, chat.id);
            const socketIds = chat.users.map(user=> user.id);
            io.to(socketIds).emit("receiveMessage", chat);
        });

        socket.on("getChats", async ()=>{
            const chats = await getAllChats(socket.userData?.id);
            socket.emit("getChats",chats);
        });

        socket.on("getAllUsers", async ()=>{
            const users = await getAvailableUsers(socket.userData?.id);
            socket.emit("getAllUsers",users);
        });

        socket.on("getMessages", async (payload: {userId: string})=>{
            const chat = await findOrCreateChat(payload.userId, socket.userData.id);
            const messages = await getAllMessages(chat.id);
            socket.emit("getMessages",messages);
        });
    })
}