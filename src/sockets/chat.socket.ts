import {Server} from "socket.io";
import { socketAuthorization } from "../middlewares/authorization";

export const initializeChatSocket = (io:Server) => {
    io.on("connection", (socket)=>{
        console.log("new chat client connected");
        const isValid = socketAuthorization(socket);
        isValid
        socket.on('sendMessage',()=>{

        })
    })
}