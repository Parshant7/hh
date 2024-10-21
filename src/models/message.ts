import { Sequelize, DataTypes, Model } from "sequelize";
import { IMessage } from "../interfaces/chat.interface";
import UserModel from "./user";
import ChatModel from "./chat";

class MessageModel extends Model implements IMessage {
    id: number;
    sentBy: number;
    chatId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    public static initModel(sequelize: Sequelize){
        MessageModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            sentBy: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                allowNull: true
            },
            chatId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'chats',
                    key: 'id'
                },
                allowNull: true
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'messages',
            timestamps: true
        })
    }

    public static associateModel(){
        MessageModel.belongsTo(UserModel, {foreignKey: 'sentBy'});
        MessageModel.belongsTo(ChatModel, {foreignKey: 'chatId', as: 'chatDetails'})
    }
}

export default MessageModel;