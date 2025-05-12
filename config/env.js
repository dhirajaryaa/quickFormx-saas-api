import { configDotenv } from "dotenv";
import path from "path";

// configure dotenv
configDotenv({
    path: path.resolve(__dirname, "../.env")
});

const {
    PORT,
    DB_URI
} = process.env;

// env freeze
const config = Object.freeze({ PORT, DB_URI })

export { config };
