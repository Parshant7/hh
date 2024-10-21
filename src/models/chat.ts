import { DataTypes, Model, Sequelize } from "sequelize";
import { IChat } from "../interfaces/chat.interface";
import { timeStamp } from "console";
import ChatUserModel from "./chatUsers";
import MessageModel from "./message";
import UserModel from "./user";

class ChatModel extends Model implements IChat{
    id: number;
    title: string;
    image: string;
    lastMessage: number;
    createdAt: Date;
    updatedAt: Date;

    public static initModel(sequelize: Sequelize){
        ChatModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastMessage: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'messages',
                    key: 'id'
                },
                allowNull: true
            },
        },{
            sequelize,
            timestamps: true,
            tableName: "chats"
        })
    }

    public static associateModel(): void {
        ChatModel.hasMany(ChatUserModel, {foreignKey: 'chatId', as: 'users'});
        ChatModel.belongsTo(MessageModel, {foreignKey: 'lastMessage'});
        ChatModel.hasMany(MessageModel, {foreignKey: 'chatId', as: 'messages'});
        ChatModel.belongsToMany(UserModel, {through: ChatModel, foreignKey: 'chatId', as: 'userDetails'})
    }
}

export default ChatModel;