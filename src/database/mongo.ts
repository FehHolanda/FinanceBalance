import {MongoClient as MongoCLI, Db} from "mongodb";

export const MongoClient = {
    client: undefined as unknown as MongoCLI,
    db:undefined as unknown as Db,
    
    async connect(): Promise<void>{
        const url = process.env.MONGODB_URL || "localhost:27017";
        //const username = process.env.MONGODB_USERNAME || "root";
        //const password = process.env.MONGODB_PASSWORD || "password";

        const client = new MongoCLI(url);
        const db = client.db("users-db");

        this.client = client;
        this.db = db;

        console.log("Connected to mongodb!");
     
    }
};