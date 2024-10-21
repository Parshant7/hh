import { Sequelize, DataTypes, Model} from "sequelize";
import {ISession} from "../interfaces/session.interface";
import UserModel from "./user";

class SessionModel extends Model implements ISession{
    id: number;
    userId: number;
    fcmToken: string;
    createdAt: Date;
    updatedAt: Date;

    public static initModel(sequelize: Sequelize){
        SessionModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            fcmToken: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            tableName: "sessions"
        })
    }

    public static associateModel(){
        SessionModel.belongsTo(UserModel, {foreignKey: 'userId', as: "userDetails"})
    }
}

export default SessionModel;