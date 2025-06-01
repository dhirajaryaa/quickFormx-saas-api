import express from "express";
import cors from 'cors';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { ORIGIN } from "./config/env.js";
import rateLimit from "express-rate-limit";
import passport from './config/passport.js'
import ErrorMiddleware from "./middlewares/error.middleware.js";

// initialize express app
const app = express();

// middlewares setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cors setup
app.use(cors({
    origin: ORIGIN,
    credentials: true
}));
// halmet 
app.use(helmet());
// cookie parser 
app.use(cookieParser());
app.use(express.static("./public"));
// passport initialized
app.use(passport.initialize());
// rate limiter
const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again in a minute"
});

//! api routes
app.use('/api', limiter); //? rate limiter middlewares
//* default routes welcome page
app.get('/', (req, res) => {
    res.send('<h4>Welcome to AI Form Builder API gateway. <a href="https://github.com/dhirajaryaa/quickFormx-saas-api" >View Docs</h1>')
});
//* auth routes
import authRouter from "./routers/auth.routes.js";
app.use("/api/v1/auth", authRouter);
//* user routes
import userRouter from "./routers/user.routes.js";
app.use("/api/v1/users", userRouter);
//* form routes
import formRouter from "./routers/form.routes.js";
app.use("/api/v1/forms", formRouter);
//* submission routes
import submissionRouter from "./routers/submission.routes.js";
app.use("/api/v1/submit", submissionRouter);

// error middleware setup
app.use(ErrorMiddleware);
export default app;
