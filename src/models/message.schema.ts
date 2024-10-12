import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
    _id: Types.ObjectId,
    sentBy: Types.ObjectId;
    chatId: Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date
};

const messageSchema = new Schema<IMessage>({
    sentBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    chatId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'chat'
    },
    content: {
        type: String,
        trim: true
    }
},{
    timestamps: true
});

export const Message = model<IMessage>('message', messageSchema);