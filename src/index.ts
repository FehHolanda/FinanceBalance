import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { router } from "./routes";




const main = async () => {
    
    config();
    
    const server = express();
    const port = process.env.PORT || 8000;

    server.use(router);

    //await MongoClient.connect();    
   
    server.listen(port,() => console.log(`listening on port ${port}!`));

};

main();



