import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../protocols";
import { User } from "../../models/user";
import { GetUserIdParams, HttpRequestGetUserId, IGetUserIdController, IGetUserIdRepository } from "./protocols";

export class GetUserIdController implements IGetUserIdController {

    constructor(private readonly getUserIdRepository: IGetUserIdRepository) { }

    async handle(httpRequest: HttpRequestGetUserId<GetUserIdParams>): Promise<HttpResponse<Omit<User, "password">>> {
        console.log(httpRequest.query);

        try {
            if (!httpRequest.query) return {
                statusCode: StatusCodes.BAD_REQUEST,
                body: "need a id",
            };

            const user = await this.getUserIdRepository.getUserId(httpRequest.query);

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