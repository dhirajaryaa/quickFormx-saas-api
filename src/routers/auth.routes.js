import { Router } from "express";
import userRegister from "../controllers/auth/register.controller.js";
import userLogin from "../controllers/auth/login.controller.js";
import loginWithGoogle from "../controllers/auth/googleAuth.controller.js";
import passport from "passport";

const authRouter = Router();

// register user
authRouter.post("/register", userRegister);
// login user
authRouter.post("/login", userLogin);
// login with google user
authRouter.get("/google", passport.authenticate('google', { scope: ["profile", 'email'], session: false }));
// Callback route after Google has authenticated the user
authRouter.get("/google/callback", passport.authenticate('google', { failureRedirect: "/login", session: false }), loginWithGoogle);

export default authRouter;
