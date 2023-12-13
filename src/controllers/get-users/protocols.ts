import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IGetUsersController {
    handle(httpRequest:HttpRequestGetUser<GetUserParams>): Promise<HttpResponse<User[]>>;
}

export interface IGetUsersRepository{
    getUsers(): Promise<User[]>;
}

export interface GetUserParams {
    page?: number;
    limit?: number;
    filter?: string;
}

export type HttpRequestGetUser<Q,B=void,H=void,P=void> =  HttpRequest<B,H,P,Q>
