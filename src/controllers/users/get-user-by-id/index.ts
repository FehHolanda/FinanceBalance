import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../protocols";
import { User } from "../../../models/user";
import { GetUserByIdParams, HttpRequestGetUserById, IGetUserByIdController,IGetUserByIdRepository, } from "./protocols";


export class GetUserByIdController implements IGetUserByIdController {

    constructor(private readonly getUserByIdRepository: IGetUserByIdRepository) { }

    async handle(httpRequest: HttpRequestGetUserById<GetUserByIdParams>): Promise<HttpResponse<Omit<User, "password">>> {

        try {
            if (!httpRequest.query) return {
                statusCode: StatusCodes.BAD_REQUEST,
                body: "need a id",
            };

            const user = await this.getUserByIdRepository.getUserById(httpRequest.query);

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