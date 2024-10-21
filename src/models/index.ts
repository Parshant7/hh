import UserModel from "./user";
import { getInstance } from "../config/mysql";
import ChatUserModel from "./chatUsers";
import MessageModel from "./message";
import SessionModel from "./session";
import ChatModel from "./chat";

const sequelize = getInstance();

UserModel.initModel(sequelize);
ChatUserModel.initModel(sequelize);
MessageModel.initModel(sequelize);
SessionModel.initModel(sequelize);
ChatModel.initModel(sequelize);

UserModel.associateModel();
ChatUserModel.associateModel();
MessageModel.associateModel();
SessionModel.associateModel();
ChatModel.associateModel();

export {UserModel, ChatUserModel, MessageModel, SessionModel, ChatModel};
