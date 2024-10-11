import mongoose, {ConnectOptions} from "mongoose";

const mongoUri = "mongodb://localhost/chatapp";

export const connectDatabase = async ()=>{
    try{
        await mongoose.connect(mongoUri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions)  
        console.log("db connected");      
    }catch(err){
        console.log("db connection error ", err);
    }
}