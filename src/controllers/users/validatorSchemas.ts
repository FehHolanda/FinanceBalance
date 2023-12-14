import { Validator } from "../../shared/middlewares/Validation";
import { CreateUserParams } from "./create-user/protocols";
import { GetUserByIdParams } from "./get-user-by-id/protocols";
import { GetUsersParams } from "./get-users/protocols";
import * as yup from "yup";
import { UpdateUserParams } from "./update-user/protocols";
import { DeleteUserParams } from "./delete-user/protocols";


const getUsersValidation = Validator((getSchema) => ({
    //Validações
    query: getSchema<GetUsersParams>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));

const getUserValidation =  Validator((getSchema) => ({
    //Validações
    query: getSchema<GetUserByIdParams>(yup.object().shape({
        id: yup.string().required(),
    })),
}));

const createUserValidation = Validator((getSchema) => ({
    //Validações
    body: getSchema<CreateUserParams>(yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    })),
}));

const updateUserValidation = Validator((getSchema) => ({
    //Validações
    body: getSchema<UpdateUserParams>(yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        username: yup.string().required(),
        password:yup.string().required(),
    })),
}));

const deleteUserValidation = Validator((getSchema) => ({
    //Validações
    query: getSchema<DeleteUserParams>(yup.object().shape({
        id: yup.string().required(),
    })),
}));


export const UserValidationSchema = {
    getUsersValidation : getUsersValidation,
    getUserValidation: getUserValidation,
    createUserValidation:createUserValidation,
    updateUserValidation:updateUserValidation,
    deleteUserValidation:deleteUserValidation
};