import { StatusCodes } from "http-status-codes";
import { GetUsersParams, HttpRequestGetUser, IGetUsersController, IGetUsersRepository } from "./protocols";
import { HttpResponse } from "../protocols";
import { User } from "../../../models/user";

export class GetUsersController implements IGetUsersController {

    constructor(private readonly getUsersRepository: IGetUsersRepository) { }

    async handle(httpRequest: HttpRequestGetUser<GetUsersParams>): Promise<HttpResponse<Omit<User,"password">[]>> {
        console.log(httpRequest.query);
        
        try {
            const users = await this.getUsersRepository.getUsers();

            return {
                statusCode: StatusCodes.OK,
                body: users,
            };

        } catch (error) {

            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                body: "Error",
            };
        }
    }
}