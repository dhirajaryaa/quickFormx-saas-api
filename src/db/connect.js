import mongoose from "mongoose";
import { DB_URI } from "../config/env.js"

console.log(DB_URI);


async function connectDB() {
    try {
        const connectionInstant = await mongoose.connect(`${DB_URI}/quickformx`);
        console.log("Database connected ", connectionInstant.connection.host);
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1);
    }
}
export default connectDB;
