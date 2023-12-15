import { Validator } from "../../shared/middlewares/Validation";
import * as yup from "yup";
import { SigninParams } from "./signin/protocols";
import { IsAuthenticatedParams } from "./validation/protocol";



const signinValidation = Validator((getSchema) => ({
    //Validações
    body: getSchema<SigninParams>(yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    })),
}));


const IsAuthenticatedValidation = Validator((getSchema) => ({
    //Validações
    headers: getSchema<IsAuthenticatedParams>(yup.object().shape({
        id: yup.string().required(),
    })),
}));



export const AuthValidationSchema = {
    signinValidation: signinValidation,
    IsAuthenticatedValidation:IsAuthenticatedValidation,    
};