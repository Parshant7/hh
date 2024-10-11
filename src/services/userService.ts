import {User} from "../models/user.schema";
import * as Errors from "../config/error.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterPayload } from "../interfaces/user.interface";
import { Session } from "../models/session.schema";

const JWT_SECRET = 'THIS IS MY SECRET';

export const register = async (payload: RegisterPayload)=>{
    const isExists = await User.findOne({$or: [{username: payload.username},{email:payload.email}]});
    if(isExists?.email == payload.email) throw Errors.EMAIL_ALREADY_EXISTS;
    if(isExists?.username == payload.username) throw Errors.USERNAME_ALREADY_EXISTS;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(payload.password,salt);

    const newUser = await User.create({
        ...payload,
        password: hash
    });
    console.log("new user ",newUser);
    return {
        status: 200,
        message: "Succesfully created new user"
    }
}


export const login = async (email: string, password: string, fcmToken: string)=>{
    const user = await User.findOne({$or: [{username: email},{email:email}]}).lean();
    if(!user) throw Errors.INVALID_CREDENTIALS;
    const isValid = bcrypt.compareSync(password, user.password);
    if(!isValid) throw Errors.INVALID_CREDENTIALS;

    const session = await Session.create({userId: user._id, fcmToken: fcmToken});
    const tokenData = {
        userId: user._id,
        sessionId: session._id,
        tokenGenAt: +new Date()
    };

    const token = jwt.sign(tokenData, JWT_SECRET);
    return {
        status: 200,
        message: "Succesfully login",
        data: {
            token,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt
        }
    }
}