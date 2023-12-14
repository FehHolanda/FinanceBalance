import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../protocols";
import { User } from "../../../models/user";
import { HttpRequestSignin, IMongoGetUserByUsernameRepository, ISigninController, SigninParams } from "./protocols";


export class SigninController implements ISigninController {

    constructor(private readonly getUserByUsernameRepository: IMongoGetUserByUsernameRepository) { }

    async handle(httpRequest: HttpRequestSignin<SigninParams>): Promise<HttpResponse<Omit<User, "password">>> {

        try {
            if (!httpRequest.body) return {
                statusCode: StatusCodes.BAD_REQUEST,
                body: "need a body",
            };

            const { password } = await this.getUserByUsernameRepository.getUserByUsername(httpRequest.body);

            if (password === httpRequest.body.password) {
                return {
                    statusCode: StatusCodes.OK,
                    body: "token",
                };
            }else{
                return {
                    statusCode: StatusCodes.UNAUTHORIZED,
                    body: "Username e Senha inválidos",
                };
            }

        } catch (error) {
            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                body: (error as Error).message,
            };
        }
    }
}