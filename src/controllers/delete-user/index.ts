import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../protocols";
import { User } from "../../models/user";
import { DeleteUserParams, HttpRequestDeleteUser, IDeleteUserController, IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IDeleteUserController {

    constructor(private readonly deleteUserRepository: IDeleteUserRepository) { }

    async handle(httpRequest: HttpRequestDeleteUser<DeleteUserParams>): Promise<HttpResponse<Omit<User, "password">>> {

        try {
            if (!httpRequest.query) return {
                statusCode: StatusCodes.BAD_REQUEST,
                body: "need a id",
            };

            await this.deleteUserRepository.deleteUser(httpRequest.query);

            return {
                statusCode: StatusCodes.OK,
                body: "Deleted",
            };

        } catch (error) {
            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                body: (error as Error).message,
            };
        }
    }
}