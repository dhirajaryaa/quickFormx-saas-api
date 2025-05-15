import { Router } from "express";
import getUserProfile from "../controllers/user/getProfile.controller.js";
import authorizedRoutes from "../middlewares/auth.middleware.js";

const userRouter = Router();

//? users routes
// get profile
userRouter.get("/profile",authorizedRoutes,getUserProfile)
export default userRouter;
