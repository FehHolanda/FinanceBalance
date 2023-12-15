import { RequestHandler } from "express";
import { SigninController } from "./signin";
import { MongoGetUserByUsernameRepository } from "../../repositories/user/get-user-by-username/mongo-get-user-username";
import { IsAuthenticatedController } from "./validation";
import { MongoGetUserByIdRepository } from "../../repositories/user/get-user-by-id/mongo-get-user-id";


const signin :RequestHandler = async (req, res) => {
    //chamada do controller
    const mongoGetUserByUsernameRepository = new MongoGetUserByUsernameRepository();
    const signinController = new SigninController(mongoGetUserByUsernameRepository);

    const { body, statusCode } = await signinController.handle({
        body:req.body,
    });

    res.status(statusCode).json(body);
};

const isAuthenticated :RequestHandler = async (req, res) => {
    //chamada do controller
    const mongoGetUserByIdRepository = new MongoGetUserByIdRepository();
    const isAuthenticatedController = new IsAuthenticatedController(mongoGetUserByIdRepository);

    const { body, statusCode } = await isAuthenticatedController.handle({
        body:req.body,
    });

    res.status(statusCode).json(body);
};


export const AuthController = {
    signin: signin,
    isAuthenticated:isAuthenticated
};