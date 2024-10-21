import {NextFunction, Request, Response} from "express";
import { register,login, profile } from '../services/userService'; 
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

export const getProfile = async (req: Request, res: Response): Promise<any>=>{
    try{
    if (!req.userData) {
        return res.status(401).json({ message: 'User data not found' });
        }
        console.log("reached here ");
        const result = await profile(req.userData.id);
        const data = {
            data: result
        }
        handleResponse(res, data);
    }catch(error){
        handleCatch(res, error);         
    }
}