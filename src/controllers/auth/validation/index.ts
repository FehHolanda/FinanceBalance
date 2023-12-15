import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../protocols";
import { HttpRequestSIsAuthenticated, IisAuthenticatedController, IsAuthenticatedParams } from "./protocol";
import { User } from "../../../models/user";
import { GetUserByIdParams, IGetUserByIdRepository } from "../../users/get-user-by-id/protocols";

export class IsAuthenticatedController implements IisAuthenticatedController {

    constructor(private readonly getUserByIdRepository: IGetUserByIdRepository) { }

    async handle(httpRequest: HttpRequestSIsAuthenticated<IsAuthenticatedParams>): Promise<HttpResponse<Omit<User,"password">>> {

        try {              
            
            if(!httpRequest.headers) return {
                statusCode: StatusCodes.UNAUTHORIZED,
                body: "Usuario não autenticado", 
            };

            const user = await this.getUserByIdRepository.getUserById(httpRequest.headers.id as GetUserByIdParams);

            if(!httpRequest.headers || !user) return {
                statusCode: StatusCodes.UNAUTHORIZED,
                body: "Usuario não autenticado", 
            };

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