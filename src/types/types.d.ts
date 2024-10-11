
declare global {
    namespace Express{
        interface Request {
            userData?: any;  // Define the type for userData
        }
    }
}
export {}