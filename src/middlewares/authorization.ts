import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../config/error.config";
import jwt from "jsonwebtoken";
import { handleCatch, handleSocketCatch } from "../handlers/global.handler";
import { SessionModel, UserModel } from "../models";
import { Socket } from "socket.io";
import { IUser } from "../interfaces/user.interface";
const JWT_SECRET = 'THIS IS MY SECRET';

export const authorization = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const jwtToken = extractTokenFromHeader(req);

        const decodedToken:any = jwt.verify(jwtToken, JWT_SECRET);
        console.log("decoded token ",decodedToken);
        if(!decodedToken)  throw UNAUTHORIZED;

        const session = await SessionModel.findByPk(decodedToken.sessionId);
        console.log("session ",session);
        if(!session)  throw UNAUTHORIZED;

        const user = await UserModel.findByPk(decodedToken.userId);
        console.log("user ",user)
        if(!user)  throw UNAUTHORIZED;
        req.userData = user;

        next();
    } catch (error) {
        console.log("authorization> error ",error);
        handleCatch(res, error);
    }
}

function extractTokenFromHeader(req: Request){
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    console.log(type, token);
    if(type=="Bearer") return token;
    throw UNAUTHORIZED;
}

export const socketAuthorization = async (socket: Socket, next: any):Promise<IUser| void> => {
    try {
        const [type, token] = socket.handshake.headers.authorization?.split(' ') ?? [];
        console.log(type, token);
        if(type!=="Bearer") 
            throw UNAUTHORIZED;

        const decodedToken:any = jwt.verify(token, JWT_SECRET);
        console.log("decoded token ",decodedToken);
        if(!decodedToken)  throw UNAUTHORIZED;

        const session = await SessionModel.findByPk(decodedToken.sessionId);
        console.log("session ",session);
        if(!session)  throw UNAUTHORIZED;

        const user = await UserModel.findByPk(decodedToken.userId);
        if(!user)  throw UNAUTHORIZED;
        socket.userData = user;
        next();
    } catch (error) {
        console.log("socket authorization> error ",error);
        handleSocketCatch(socket, error);
    }
}