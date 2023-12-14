import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IGetUsersController {
    handle(httpRequest:HttpRequestGetUser<GetUsersParams>): Promise<HttpResponse<Omit<User,"password">[]>>;
}

export interface IGetUsersRepository{
    getUsers(): Promise<Omit<User,"password">[]>;
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    filter?: string;
}

export type HttpRequestGetUser<Q,B=void,H=void,P=void> =  HttpRequest<B,H,P,Q>
