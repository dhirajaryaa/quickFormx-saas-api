import { configDotenv } from "dotenv";
import path from "path";

// configure dotenv
configDotenv({
    path: path.resolve(__dirname, "../.env")
});
const config = Object.freeze({
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI
});

export const {
    PORT,
    DB_URI
} = config;
