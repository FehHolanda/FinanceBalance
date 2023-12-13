import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { router } from "./routes";
import { SetLocale } from "./shared/services/TranslationsYup";


const main = async () => {
    
    config();
    SetLocale();
    
    const server = express();
    const port = process.env.PORT || 8000;

    server.use(express.json(),router);

    await MongoClient.connect();    
   
    server.listen(port,() => console.log(`listening on port ${port}!`));

};

main();



