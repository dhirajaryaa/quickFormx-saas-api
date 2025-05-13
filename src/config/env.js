import { configDotenv } from "dotenv";

// configure dotenv
configDotenv({
    path: "./.env"
});
const config = Object.freeze({
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    ORIGIN: process.env.ORIGIN
});

export const {
    PORT,
    DB_URI,
    ORIGIN
} = config;
