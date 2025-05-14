import { Router } from "express";
import userRegister from "../controllers/auth/register.controller.js";
import userLogin from "../controllers/auth/login.controller.js";

const authRouter = Router();

// register user
authRouter.post("/register", userRegister);
// login user
authRouter.post("/login", userLogin);

export default authRouter;
