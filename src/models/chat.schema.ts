import { Schema, model, Document, Types } from "mongoose";

export interface IChat extends Document {
    _id: Types.ObjectId,
    title: string;
    image: string;
    users: [Types.ObjectId];
    lastMessage: Types.ObjectId,
    createdAt: Date;
    updatedAt: Date
};

const chatSchema = new Schema<IChat>({
    title: {
        type: String,
        required: false,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'message'
    }
},{
    timestamps: true
});

export const Chat = model<IChat>('chat', chatSchema);