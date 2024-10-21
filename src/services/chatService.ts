import mongoose, { Types } from "mongoose";
import { UserModel, MessageModel, ChatUserModel, ChatModel } from "../models";
import path from "path";
import { Identifier, Op, Sequelize } from "sequelize";
import { IChat, ISendMessage } from "../interfaces/chat.interface";
import { handleSocketCatch } from "../handlers/global.handler";

export const findOrCreateChat = async (
  user1Id: Identifier,
  user2Id: Identifier
):Promise<IChat> => {
  // const chat = await ChatUserModel.findOne({users: {$all: [user1, user2]}});
  try {
    console.log("userids ",user1Id, user2Id);
    const chat = await ChatUserModel.findAll({
      where: {
        userId: {
          [Op.in]: [user1Id, user2Id],
        },
      },
      attributes: ["chatId"],
      group: ["chatId"],
      having: Sequelize.literal("Count(DISTINCT userId) = 2"),
    });
    console.log('chats ',chat)
    if (chat.length) {
    
      return await ChatModel.findByPk(chat[0].chatId, {
        include: [
          {
            model: UserModel,
            as: 'userDetails',
            // include: [
            //   {
            //     model: UserModel,
            //     as: 'userDetail',
            //     attributes: ['id', 'username', 'email']
            //   }
            // ]
          },
        ],
      });
    }
    const newChat = await ChatModel.create();
    console.log(newChat);  // Will output the new chat entry

    await ChatUserModel.bulkCreate([
      { chatId: newChat.id, userId: user1Id },
      { chatId: newChat.id, userId: user2Id },
    ]);
    
    return await ChatModel.findByPk(newChat.id, {
      include: [
        {
          model: ChatUserModel,
          include: [
            {
              model: UserModel,
              attributes: ['id', 'username', 'email']
            }
          ]
        },
      ],
    });
  } catch (error) {
    console.log("error ",error);
  
  }
  //todd pending
};

export const createMessage = async (
  payload: ISendMessage,
  userId: Identifier,
  chatId: Identifier
) => {
  console.log("reached herer ")
  const newMessage = await MessageModel.create(
    {
      content: payload.content,
      sentBy: userId,
      chatId: chatId,
    },
    {
      include: { all: true },
    }
  );

  await ChatModel.update(
    { lastMessage: newMessage.id },
    { where: { id: chatId } }
  );

  return newMessage;
};

export const getChatIds = async (userId: Identifier) => {
  const chats = await ChatUserModel.findAll({ where: { userId: userId } });
  const chatIds = chats.map((chat) => {
    return chat.id.toString();
  });
  return chatIds;
};

export const getAllChats = async (userId: Identifier) => {
  const chatIds = getChatIds(userId);
  const chats = await ChatModel.findAll({
    where: {
      id: {
        [Op.in]: chatIds,
      },
    },
    include:[{
        model: UserModel,
        as: 'users',
        attributes: {
            exclude: ['password']
        }
    }]
  });
  return chats;
};

export const getAvailableUsers = async (userId: Identifier) => {
  const chats = await UserModel.findAll({
    where: {
      id: {
        [Op.ne]: userId
      }
    },
    attributes: {
      exclude: ['password']
    }
  });
  return chats;
};

export const getAllMessages = async (chatId: Identifier) => {
  const messages = await MessageModel.findAll({
    where: {
      chatId: chatId
    },
    include: [
      {
        model: UserModel,
        as: 'sentBy',
        attributes: {
          exclude: ['password']
        }
      }
    ]
  })
  return messages;
};
