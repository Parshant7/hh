import {Router} from "express";
import { loginUser, registerUser } from "../controllers/userController";
import { loginSchema, signupSchema } from "../validation/user.validation";
import {validate} from "../middlewares/validate";
const router = Router();

router.post("/signup", validate(signupSchema, 'body'), registerUser);
router.post("/login", validate(loginSchema, 'body'), loginUser);

export default router;


