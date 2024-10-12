
declare global {
    namespace Express{
        interface Request {
            userData?: any;  // Define the type for userData
        }
    }

}   
declare module 'socket.io'{
    interface Socket {
        userData?: any;  // Define the type for userData
    }
}

export {};