import { Router } from "express";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-create-user";
import { GetUsersController } from "../controllers/get-users";
import { CreateUserController } from "../controllers/create-user";
import * as yup from "yup";
import { Validator } from "../shared/middlewares/Validation";
import { CreateUserParams } from "../controllers/create-user/protocols";
import { GetUsersParams } from "../controllers/get-users/protocols";
import { UpdateUserParams } from "../controllers/update-user/protocols";
import { GetUserByIdParams } from "../controllers/get-user-by-id/protocols";
import { GetUserByIdController } from "../controllers/get-user-by-id";
import { MongoGetUserByIdRepository } from "../repositories/get-user-by-id/mongo-get-user-id";
import { UpdateUserController } from "../controllers/update-user";
import { MongoUpdateUserRepository } from "../repositories/update-user/mongo-update-user";
import { DeleteUserParams } from "../controllers/delete-user/protocols";
import { DeleteUserController } from "../controllers/delete-user";
import { MongoDeleteUserRepository } from "../repositories/delete-user/mongo-delete-user";



export const router = Router();


router.get("/users", Validator((getSchema) => ({
    //Validações
    query: getSchema<GetUsersParams>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
})), async (req, res) => {
    //chamada do controller
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle({
        query:req.query,
    });

    res.send(body).status(statusCode);
});

router.get("/user", Validator((getSchema) => ({
    //Validações
    query: getSchema<GetUserByIdParams>(yup.object().shape({
        id: yup.string().required(),
    })),
})), async (req, res) => {
    //chamada do controller
    const mongoGetUserByIdRepository = new MongoGetUserByIdRepository();
    const getUserByIdController = new GetUserByIdController(mongoGetUserByIdRepository);

    const { body, statusCode } = await getUserByIdController.handle({
        query:req.query,
    });

    res.send(body).status(statusCode);
});


router.post("/user", Validator((getSchema) => ({
    //Validações
    body: getSchema<CreateUserParams>(yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    })),
})), async (req, res) => {
    //chamada do controller
    const mongoCreateUserRepository = new MongoCreateUserRepository;
    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({
        body: req.body,
    });

    res.send(body).status(statusCode);
});

router.put("/user", Validator((getSchema) => ({
    //Validações
    body: getSchema<UpdateUserParams>(yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        username: yup.string().required(),
        password:yup.string().required(),
    })),
})), async (req, res) => {
    //chamada do controller
    const mongoUpdateUserRepository = new MongoUpdateUserRepository;
    const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

    const { body, statusCode } = await updateUserController.handle({
        body: req.body,
    });

    res.send(body).status(statusCode);
});

router.delete("/user", Validator((getSchema) => ({
    //Validações
    body: getSchema<DeleteUserParams>(yup.object().shape({
        id: yup.string().required(),
    })),
})), async (req, res) => {
    //chamada do controller
    const mongoDeleteUserRepository = new MongoDeleteUserRepository;
    const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);

    const { body, statusCode } = await deleteUserController.handle({
        query: req.query,
    });

    res.send(body).status(statusCode);
});