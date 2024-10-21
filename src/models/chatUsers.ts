import { Sequelize, DataTypes, Model, Identifier } from "sequelize";
import { IChatUser } from "../interfaces/chat.interface";
import ChatModel from "./chat";
import UserModel from "./user";

class ChatUserModel extends Model implements IChatUser{
    id: number;
    userId: Identifier;
    chatId: Identifier
    createdAt: Date;
    updatedAt: Date;

    static initModel(sequelize: Sequelize){
        ChatUserModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'   
                }
            },
            chatId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'chats',
                    key: 'id'
                }
            }
        },{
            sequelize,
            timestamps: true,
            tableName: 'chatUsers'
        })
    }

    static associateModel(){
        ChatUserModel.belongsTo(ChatModel, {foreignKey: 'chatId', as: 'chatDetail'});
        ChatUserModel.belongsTo(UserModel, {foreignKey: 'userId', as: 'userDetail'});
    }
}

export default ChatUserModel;