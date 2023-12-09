import { IGetUsersController, IGetUsersrepository } from "./protocols";

export class GetUsersController implements IGetUsersController {

    constructor(private readonly getUsersRepository:IGetUsersrepository){}
    
    async handle() {
       
        try {            
            const users =  await this.getUsersRepository.getUsers(); 

            return {
                statusCode:200,
                body:users,
            };

        } catch (error) {
            
            return {
                statusCode:500,
                body:"Error",
            };
        }
        


    }
}