import { Validator } from "../../shared/middlewares/Validation";
import * as yup from "yup";
import { SigninParams } from "./signin/protocols";



const signinValidation = Validator((getSchema) => ({
    //Validações
    body: getSchema<SigninParams>(yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    })),
}));



export const AuthValidationSchema = {
    signinValidation: signinValidation,    
};