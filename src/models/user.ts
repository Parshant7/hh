import { Model, Sequelize, DataTypes} from "sequelize";
import {IUser} from "../interfaces/user.interface";
import ChatModel from "./chat";
import ChatUserModel from "./chatUsers";

class UserModel extends Model implements IUser{
    public id!:number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public createdAt: Date;
    public updatedAt: Date;

    static initModel(sequelize:Sequelize): void{
        UserModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                password: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                timestamps: true,
                tableName: "users"
            }
        )
    }
    public static associateModel(){
        // UserModel.hasMany(ChatUserModel, {foreignKey: 'userId'});
        UserModel.belongsToMany(ChatModel, {through: ChatUserModel, foreignKey:'chatId'})
    }
}

export default UserModel;