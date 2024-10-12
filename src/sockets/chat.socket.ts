import {Server} from "socket.io";
import { socketAuthorization } from "../middlewares/authorization";
import { ISendMessage } from "../interfaces/chat.interface";
import { createMessage, findOrCreateChat, getAllChats, getAllMessages, getAvailableUsers, getChatIds } from "../services/chatService";

export const initializeChatSocket = (io:Server) => {
    io.on("connection", async(socket)=>{
        //join to chat sockets
        const chatIds = await getChatIds(socket.userData?._id);
        socket.join([...chatIds, socket.userData?._id]);

        socket.on('sendMessage',async (payload: ISendMessage)=>{
            console.log("inside send message ", payload);
            const userId = socket.userData?._id;
            const chat = await findOrCreateChat(payload.sentTo, userId);
            const newMessage = await createMessage(payload, userId, chat._id);
            const socketIds = chat.users.map(user=> user.toString());
            io.to(socketIds).emit("receiveMessage", newMessage);
        });

        socket.on("getChats", async ()=>{
            const chats = await getAllChats(socket.userData?._id);
            socket.emit("getChats",chats);
        });

        socket.on("getAllUsers", async ()=>{
            const users = await getAvailableUsers(socket.userData?._id);
            socket.emit("getAllUsers",users);
        });

        socket.on("getMessages", async (payload: {userId: string})=>{
            const chat = await findOrCreateChat(payload.userId, socket.userData._id);
            const messages = await getAllMessages(chat._id);
            socket.emit("getMessages",messages);
        });
    })
}