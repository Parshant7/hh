import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(3).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
}).unknown(false);

export const loginSchema = Joi.object({
    email: Joi.string().email().min(3).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    fcmToken: Joi.string().min(3).max(3000),
}).unknown(false);

