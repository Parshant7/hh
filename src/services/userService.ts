import * as Errors from "../config/error.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterPayload } from "../interfaces/user.interface";
import { SessionModel, UserModel } from "../models";
import { Identifier, Op } from "sequelize";

const JWT_SECRET = "THIS IS MY SECRET";

export const register = async (payload: RegisterPayload) => {
  const isExists = await UserModel.findOne({
    where: {
      [Op.or]: [{ username: payload.username }, { email: payload.email }],
    },
    raw: true,
  });

  if (isExists?.email == payload.email) throw Errors.EMAIL_ALREADY_EXISTS;
  if (isExists?.username == payload.username)
    throw Errors.USERNAME_ALREADY_EXISTS;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(payload.password, salt);

  const newUser = await UserModel.create({
    ...payload,
    password: hash,
  });
  console.log("new user ", newUser);
  return {
    status: 200,
    message: "Succesfully created new user",
  };
};

export const login = async (
  email: string,
  password: string,
  fcmToken: string
) => {
  const user = await UserModel.findOne({
    where: {
        [Op.or]: [{ username: email }, { email: email }],
    },
    raw: true    
  });

  if (!user) throw Errors.INVALID_CREDENTIALS;
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) throw Errors.INVALID_CREDENTIALS;

  const session = await SessionModel.create({
    userId: user.id,
    fcmToken: fcmToken,
  });
  const tokenData = {
    userId: user.id,
    sessionId: session.id,
    tokenGenAt: +new Date(),
  };

  const token = jwt.sign(tokenData, JWT_SECRET);
  return {
    status: 200,
    message: "Succesfully login",
    data: {
      token,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    },
  };
};

export const profile = async (userId: Identifier) => {

  const user = await UserModel.findByPk(userId,{
    attributes: {
      exclude: ['password']
    }
  });
  if (!user) throw Errors.UNAUTHORIZED;
  return user;
};
