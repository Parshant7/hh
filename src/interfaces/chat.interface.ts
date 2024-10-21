import { NumberExpression, Types } from "mongoose";
import { Identifier } from "sequelize";

export interface ISendMessage {
    sentTo: Identifier,
    content: string
}
export interface IMessage{
    id: number;
    sentBy: number;
    chatId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface IChat {
    id: number,
    title: string;
    image: string;
    lastMessage: number,
    users?: any;
    createdAt: Date;
    updatedAt: Date
};

export interface IChatUser{
    id: number
    userId: Identifier
    chatId: Identifier
    createdAt: Date
    updatedAt: Date
}