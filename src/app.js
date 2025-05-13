import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { ORIGIN } from "./config/env.js";

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

export default app;
