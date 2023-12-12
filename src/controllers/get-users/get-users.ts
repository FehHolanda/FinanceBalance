import { StatusCodes } from "http-status-codes";
import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {

    constructor(private readonly getUsersRepository:IGetUsersRepository){}
    
    async handle() {
       
        try {            
            const users =  await this.getUsersRepository.getUsers(); 

            return {
                statusCode:StatusCodes.OK,
                body:users,
            };

        } catch (error) {
            
            return {
                statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                body:"Error",
            };
        }
        


    }
}