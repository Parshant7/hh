import { Schema, model, Document, Types } from "mongoose";

interface ISession extends Document {
    userId: Types.ObjectId;
    fcmToken: string
    createdAt: Date;
    updatedAt: Date
};

const sessionSchema = new Schema<ISession>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fcmToken: {
        type: String,
        default: null
    }
},{
    timestamps: true
});

export const Session = model<ISession>('session', sessionSchema);