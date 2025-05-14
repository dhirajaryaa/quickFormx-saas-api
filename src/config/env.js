import { configDotenv } from "dotenv";

// configure dotenv
configDotenv({
    path: "./.env"
});
const config = Object.freeze({
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    ORIGIN: process.env.ORIGIN,
    Access_Token_Secret: process.env.Access_Token_Secret,
    Access_Token_Expired: process.env.Access_Token_Expired,
    Refresh_Token_Secret: process.env.Refresh_Token_Secret,
    Refresh_Token_Expired: process.env.Refresh_Token_Expired,
});

export const {
    PORT,
    DB_URI,
    ORIGIN,
    Access_Token_Secret,
    Access_Token_Expired,
    Refresh_Token_Secret,
    Refresh_Token_Expired
} = config;
