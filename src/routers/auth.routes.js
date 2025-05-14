import { Router } from "express";
import userRegister from "../controllers/auth/register.controller.js";

const authRouter = Router();

// register user
authRouter.post("/register", userRegister);

export default authRouter;
