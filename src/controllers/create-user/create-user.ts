import { StatusCodes } from "http-status-codes";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController {

    constructor(private readonly createUserRepository:ICreateUserRepository){}

    async handle(httpRequest:HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {  
            
            if(!httpRequest.body) return{
                statusCode:StatusCodes.BAD_REQUEST,
                body:"need a body"
            };
            const user = await this.createUserRepository.createUser(httpRequest.body);

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