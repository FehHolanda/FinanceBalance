import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserController {
    handle(httpRequest:HttpRequestCreateUser<CreateUserParams>): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
    name: string;
    username: string;
    password: string;
}

export interface ICreateUserRepository{
    createUser(params:CreateUserParams): Promise<User>;
}

export type HttpRequestCreateUser<B,H=void,P=void,Q=void> =  HttpRequest<B,H,P,Q>