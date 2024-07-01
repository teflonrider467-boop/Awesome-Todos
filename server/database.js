import { config } from 'dotenv';
import {MongoClient, ServerApiVersion} from "mongodb";

config();
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const options = {
    ServerApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;
const connectToMongoDB = async () =>{
    if(!client){
        try {
            client = await MongoClient.connect(uri, options);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.log(error);
        }
    }
    return client;
}

const getConnectedClient = () =>client;

export {connectToMongoDB, getConnectedClient};