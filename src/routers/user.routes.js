import { Router } from "express";
import getUserProfile from "../controllers/user/getProfile.controller.js";
import authorizedRoutes from "../middlewares/auth.middleware.js";
import updateUserProfile from "../controllers/user/updateProfile.controller.js";

const userRouter = Router();

//? users routes
// get profile
userRouter.get("/profile",authorizedRoutes,getUserProfile);
// update profile
userRouter.patch("/profile",authorizedRoutes,updateUserProfile);

export default userRouter;
