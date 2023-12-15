import {MongoClient as MongoCLI, Db} from "mongodb";

export const MongoClient = {
    client: undefined as unknown as MongoCLI,
    db:undefined as unknown as Db,
    
    async connect(): Promise<void>{

        const client = await new MongoCLI(process.env.MONGODB_STRINGCONNECTION || "mongodb://root:password@localhost:27017");
        
        const db = client.db("users-db");

        this.client = client;
        this.db = db;

        console.log("Connected to mongodb!");
     
    }
};