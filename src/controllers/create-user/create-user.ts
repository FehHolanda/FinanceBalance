import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";
import * as yup from "yup";

const bodyValidation: yup.ObjectSchema<CreateUserParams> = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
}); 


export class CreateUserController implements ICreateUserController {

    constructor(private readonly createUserRepository:ICreateUserRepository){}

    async handle(httpRequest:HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        let validadedData: CreateUserParams | undefined = undefined;
        
        try {
            validadedData = await bodyValidation.validate(httpRequest.body);

        } catch (error) {
            const yupError = error as yup.ValidationError;

            return {
                statusCode: StatusCodes.BAD_REQUEST,
                body:yupError.message,
            };
        }

        try {  
            
            const user = await this.createUserRepository.createUser(validadedData);

            return {
                statusCode: StatusCodes.CREATED,
                body:user,
            };

        } catch (error) {
            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                body: "Something went wrong."
            };
        }
    }
    
}