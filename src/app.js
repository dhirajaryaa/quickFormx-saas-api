import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { ORIGIN } from "./config/env.js";
import rateLimit from "express-rate-limit";

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
app.use(cookieParser());
app.use(express.static("./public"));

// rate limiter
const limiter = rateLimit({
    max: 3,
    windowMs: 60 * 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again in a minute"
});

// api routes
app.use('/api', limiter); //? rate limiter middlewares
// default routes welcome page
app.get('/', (req, res) => {
    res.send('<h4>Welcome to AI Form Builder API gateway. <a href="https://github.com/dhirajaryaa/quickFormx-saas-api" >View Docs</h1>')
});

export default app;
