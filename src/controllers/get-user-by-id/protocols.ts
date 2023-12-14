import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IGetUserByIdController {
    handle(httpRequest:HttpRequestGetUserById<GetUserByIdParams>): Promise<HttpResponse<Omit<User,"password">>>;
}

export interface IGetUserByIdRepository{
    getUserById(params:GetUserByIdParams): Promise<Omit<User,"password">>;
}

export interface GetUserByIdParams {
    id?: string;
}

export type HttpRequestGetUserById<Q,B=void,H=void,P=void> =  HttpRequest<B,H,P,Q>
