import {User} from '../models/user.schema';
import {Request, Response} from "express";
import { register,login } from '../services/userService'; 
import { handleCatch, handleResponse } from '../handlers/global.handler';
export const registerUser = async (req: Request, res: Response)=>{
    try{    
        const result = await register(req.body);
        handleResponse(res, result);
    }catch(error){
        handleCatch(res, error);         
    }
}

export const loginUser = async (req: Request, res: Response)=>{
    try{    
        const {email, password, fcmToken} = req.body;
        const result = await login(email, password, fcmToken);
        handleResponse(res, result);
    }catch(error){
        handleCatch(res, error);         
    }
}