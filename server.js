import app from "./src/app.js";

const port = 3000;

// listen in port
app.listen(port, () => {
    console.log(`server listen on port: ${port}`);

})
