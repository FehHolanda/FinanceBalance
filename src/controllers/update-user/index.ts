import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../protocols";
import { User } from "../../models/user";
import { HttpRequestUpdateUser, IUpdateUserController, IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IUpdateUserController {

    constructor(private readonly updateUserRepository: IUpdateUserRepository) { }

    async handle(httpRequest: HttpRequestUpdateUser<UpdateUserParams>): Promise<HttpResponse<Omit<User, "password">>> {
        console.log(httpRequest.body);

        try {
            if (!httpRequest.body) return {
                statusCode: StatusCodes.BAD_REQUEST,
                body: "need a id",
            };

            const user = await this.updateUserRepository.updateUser(httpRequest.body);

            return {
                statusCode: StatusCodes.OK,
                body: user,
            };

        } catch (error) {
            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                body: (error as Error).message,
            };
        }
    }
}