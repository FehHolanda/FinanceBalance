import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateUserController {
    handle(httpRequest:HttpRequestUpdateUser<UpdateUserParams>): Promise<HttpResponse<Omit<User,"password">>>;
}

export interface IUpdateUserRepository{
    updateUser(params:UpdateUserParams): Promise<Omit<User,"password">>;
}

export interface UpdateUserParams {
    id: string;
    name: string;
    username: string;
    password: string;
}

export type HttpRequestUpdateUser<B,Q=void,H=void,P=void> =  HttpRequest<B,H,P,Q>
