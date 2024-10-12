import mongoose, { Types } from "mongoose";
import { Chat, IChat } from "../models/chat.schema";
import { ISendMessage } from "../interfaces/chat.interface";
import { Message } from "../models/message.schema";
import { User } from "../models/user.schema";
import path from "path";

type MongoId = string | Types.ObjectId;

export const findOrCreateChat = async (user1: MongoId, user2: MongoId)=>{
    const user1Id = new mongoose.Types.ObjectId(user1);
    const user2Id = new mongoose.Types.ObjectId(user2);

    const chat = await Chat.findOne({users: {$all: [user1, user2]}});
    if(chat) return chat;
    return await Chat.create({users: [user1Id, user2Id]});
}

export const createMessage = async (payload: ISendMessage, userId: MongoId, chatId: MongoId)=>{
    const newMessage = await Message.create({
        content: payload.content,
        sentBy: new mongoose.Types.ObjectId(userId),
        chatId: new mongoose.Types.ObjectId(chatId)
    });
    await Chat.findByIdAndUpdate(chatId,{$set: {lastMessage: newMessage._id}});
    return await newMessage.populate("chatId sentBy");
}

export const getChatIds = async (userId: MongoId)=>{
    const chats = await Chat.find({users: {$in: [userId]}}, "_id");
    const chatIds = chats.map(chat=>{
        return chat._id.toString;
    });
    return chatIds;
}

export const getAllChats = async (userId: MongoId)=>{
    const chats = await Chat.find({users: {$in: [userId]}},{}, {sort: {updatedAt: -1}}).populate("lastMessage users");
    return chats;
}


export const getAvailableUsers = async (userId: MongoId)=>{
    const chats = await User.find({_id: {$ne: new mongoose.Types.ObjectId(userId)}},"_id name firstName lastName" );
    return chats;
}

export const getAllMessages = async (chatId: MongoId)=>{
    const messages = await Message.find({chatId: new mongoose.Types.ObjectId(chatId)}).populate({path: 'sentBy', select: "_id firstName lastName username email"}).lean();
    return messages;
}