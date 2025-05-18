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
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    Gmail_UserId: process.env.Gmail_UserId,
    Gmail_User_Password: process.env.Gmail_User_Password,
    NODE_ENV: process.env.NODE_ENV,
    URL: process.env.URL,
    Logo_Url: process.env.Logo_Url,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
});

export const cookiesOptions = {
    http: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None"
}

export const {
    PORT,
    DB_URI,
    ORIGIN,
    Access_Token_Secret,
    Access_Token_Expired,
    Refresh_Token_Secret,
    Refresh_Token_Expired,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    Gmail_UserId,
    Gmail_User_Password,
    NODE_ENV,
    URL,
    Logo_Url,
    GEMINI_API_KEY
} = config;
