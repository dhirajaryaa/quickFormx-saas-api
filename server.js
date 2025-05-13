import app from "./src/app.js";
import connectDB from "./src/db/connect.js"
import { PORT } from "./src/config/env.js";

const port = PORT || 3000;

// database connection
connectDB()
    .then(() => {
        // listen in port
        app.listen(port, () => {
            console.log(`server listen on port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("Database connection error", err);
    });
