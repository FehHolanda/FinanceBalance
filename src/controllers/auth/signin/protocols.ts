import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface  ISigninController {
    handle(httpRequest:HttpRequestSignin<SigninParams>): Promise<HttpResponse<IAccessToken>>;
}

export interface IMongoGetUserByUsernameRepository{
    getUserByUsername(params:SigninParams):  Promise<User>;
}

export interface SigninParams {
    username: string;
    password: string;
}

export interface IAccessToken {
    accessToken:string,
}

export type HttpRequestSignin<B,Q=void,H=void,P=void> =  HttpRequest<B,H,P,Q>
