import express from "express";
import router from "./routes.js";
import { config } from 'dotenv';
import {connectToMongoDB, getConnectedClient} from "./database.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Creating Instance of Express
const app = express();
app.use(express.json());
// Write the below code before the app.use /api router
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "build/index.html"));
})

app.use("/api", router);

// Test Route
// app.get("/hello", (req, res) => {
//     res.status(200).json({ message: "hello peoples"});
// });

const port = process.env.PORT || 5000;

async function startServer(){
    await connectToMongoDB();
    app.listen(port, () =>{
        console.log(`Server is listening on http://localhost:${port}`);
    });
}
startServer();