import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IDeleteUserController {
    handle(httpRequest:HttpRequestDeleteUser<DeleteUserParams>): Promise<HttpResponse<Omit<User,"password">>>;
}

export interface IDeleteUserRepository{
    deleteUser(params:DeleteUserParams): void;
}

export interface DeleteUserParams {
    id?: string;
}

export type HttpRequestDeleteUser<Q,B=void,H=void,P=void> =  HttpRequest<B,H,P,Q>
