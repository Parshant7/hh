import {Server} from "socket.io";

export const initializeChatSocket = (io:Server) => {
    io.on("connection", (socket)=>{
        console.log("new chat client connected");
        socket.on('sendMessage',()=>{
            
        })
    })
}