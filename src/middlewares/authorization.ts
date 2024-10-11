import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../config/error.config";
import jwt from "jsonwebtoken";
import { handleCatch } from "../handlers/global.handler";
import { User } from "../models/user.schema";
import mongoose from "mongoose";
import { Session } from "../models/session.schema";

const JWT_SECRET = 'THIS IS MY SECRET';

export const authorization = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const jwtToken = extractTokenFromHeader(req);

        const decodedToken:any = jwt.verify(jwtToken, JWT_SECRET);
        console.log("decoded token ",decodedToken);
        if(!decodedToken)  throw UNAUTHORIZED;

        const session = await Session.findById(mongoose.Types.ObjectId.createFromHexString(decodedToken.sessionId));
        console.log("session ",session);
        if(!session)  throw UNAUTHORIZED;

        const user = await User.findById(mongoose.Types.ObjectId.createFromHexString(decodedToken.userId));
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