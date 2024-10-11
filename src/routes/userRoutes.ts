import {Router, Request} from "express";
import { getProfile, loginUser, registerUser } from "../controllers/userController";
import { loginSchema, signupSchema } from "../validation/user.validation";
import {validate} from "../middlewares/validate";
import { authorization } from "../middlewares/authorization";
const router = Router();

router.post("/signup", validate(signupSchema, 'body'), registerUser);
router.post("/login", validate(loginSchema, 'body'), loginUser);
router.post("/profile", authorization, getProfile);

export default router;


