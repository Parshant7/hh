import { Types } from "mongoose";

export interface ISendMessage {
    sentTo: Types.ObjectId | string,
    content: string
}