import {MongoClient as MongoCLI, Db} from "mongodb";

export const MongoClient = {
    client: undefined as unknown as MongoCLI,
    db:undefined as unknown as Db,
    
    async connect(): Promise<void>{
        const url = process.env.MONGODB_URL || "localhost:27017";
        //const username = process.env.MONGODB_USERNAME || "root";
        //const password = process.env.MONGODB_PASSWORD || "password";

        const client = new MongoCLI("mongodb+srv://doadmin:keS05734gB6Axh91@db-mongodb-finance-balance-06fc0690.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-finance-balance");
        
        const db = client.db("users-db");

        this.client = client;
        this.db = db;

        console.log("Connected to mongodb!");
     
    }
};