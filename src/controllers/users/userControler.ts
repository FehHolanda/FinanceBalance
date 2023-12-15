import { RequestHandler } from "express";
import { MongoGetUsersRepository } from "../../repositories/user/get-users/mongo-get-users";
import { GetUsersController } from "./get-users";
import { GetUserByIdController } from "./get-user-by-id";
import { MongoGetUserByIdRepository } from "../../repositories/user/get-user-by-id/mongo-get-user-id";
import { MongoCreateUserRepository } from "../../repositories/user/create-user/mongo-create-user";
import { CreateUserController } from "./create-user";
import { MongoUpdateUserRepository } from "../../repositories/user/update-user/mongo-update-user";
import { UpdateUserController } from "./update-user";
import { MongoDeleteUserRepository } from "../../repositories/user/delete-user/mongo-delete-user";
import { DeleteUserController } from "./delete-user";



const getAll:RequestHandler = async (req, res) => {
    //chamada do controller
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle({
        query: req.query,
    });

    res.send(body).status(statusCode);
};

const getUser :RequestHandler = async (req, res) => {
    //chamada do controller
    const mongoGetUserByIdRepository = new MongoGetUserByIdRepository();
    const getUserByIdController = new GetUserByIdController(mongoGetUserByIdRepository);

    const { body, statusCode } = await getUserByIdController.handle({
        query:req.query,
    });

    res.send(body).status(statusCode);
};

const create :RequestHandler = async (req, res) => {
    //chamada do controller
    const mongoCreateUserRepository = new MongoCreateUserRepository;
    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({
        body: req.body,
    });

    res.send(body).status(statusCode);
};


const update :RequestHandler = async (req, res) => {
    //chamada do controller
    const mongoUpdateUserRepository = new MongoUpdateUserRepository;
    const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

    const { body, statusCode } = await updateUserController.handle({
        body: req.body,
    });

    res.send(body).status(statusCode);
};

const erase: RequestHandler = async (req, res) => {
    //chamada do controller
    const mongoDeleteUserRepository = new MongoDeleteUserRepository;
    const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);

    const { body, statusCode } = await deleteUserController.handle({
        query: req.query,
    });

    res.status(statusCode).send(body);
};



export const UserController = {
    create: create,
    getAll:getAll,
    getUser:getUser,
    update:update,
    delete:erase
};