import { Router } from "express";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-create-user";
import { GetUsersController } from "../controllers/get-users/get-users";
import { CreateUserController } from "../controllers/create-user/create-user";

export const router = Router();

router.get("/users", async (req,res)=> {

    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    
    const {body, statusCode} = await getUsersController.handle();

    res.send(body).status(statusCode);
});

router.post("/users",async(req,res) => {

    const mongoCreateUserRepository = new MongoCreateUserRepository;
    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const {body,statusCode} = await createUserController.handle({
        body: req.body,            
    });

    res.send(body).status(statusCode);
});