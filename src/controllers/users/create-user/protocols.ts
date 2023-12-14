import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserController {
    handle(httpRequest:HttpRequestCreateUser<CreateUserParams>): Promise<HttpResponse<Omit<User,"password">>>;
}

export interface CreateUserParams {
    name: string;
    username: string;
    password: string;
}

export interface ICreateUserRepository{
    createUser(params:CreateUserParams): Promise<Omit<User,"password">>;
}

export type HttpRequestCreateUser<B,H=void,P=void,Q=void> =  HttpRequest<B,H,P,Q>