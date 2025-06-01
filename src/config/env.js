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
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,
    FRONTEND_URL: process.env.FRONTEND_URL
});

export const cookiesOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none', // <-- explicitly set
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000 // optional: 7 days
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
    GEMINI_API_KEY,
    OAUTH_REDIRECT_URL,
    FRONTEND_URL
} = config;
