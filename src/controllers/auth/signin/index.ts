import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../protocols";
import { HttpRequestSignin, IAccessToken, IMongoGetUserByUsernameRepository, ISigninController, SigninParams } from "./protocols";
import { JWTService } from "../../../shared/services/JWTservice";

export class SigninController implements ISigninController {

    constructor(private readonly getUserByUsernameRepository: IMongoGetUserByUsernameRepository) { }

    async handle(httpRequest: HttpRequestSignin<SigninParams>): Promise<HttpResponse<IAccessToken>> {

        try {
            if (!httpRequest.body) return {
                statusCode: StatusCodes.BAD_REQUEST,
                body: "need a body",
            };

            const { password,...rest } = await this.getUserByUsernameRepository.getUserByUsername(httpRequest.body);

            if (password === httpRequest.body.password) {
                
                const acessToken = JWTService.sign({uid:rest.id});

                if(acessToken === "JET_SECRET_NOT_FOUND"){
                    return{
                        statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                        body:"Erro ao gerar token de acesso"
                    };
                }
                
                return {
                    statusCode: StatusCodes.OK,
                    body: {accessToken:acessToken},
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