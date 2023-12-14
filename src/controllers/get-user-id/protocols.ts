import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IGetUserIdController {
    handle(httpRequest:HttpRequestGetUserId<GetUserIdParams>): Promise<HttpResponse<Omit<User,"password">>>;
}

export interface IGetUserIdRepository{
    getUserId(params:GetUserIdParams): Promise<Omit<User,"password">>;
}

export interface GetUserIdParams {
    id?: string;
}

export type HttpRequestGetUserId<Q,B=void,H=void,P=void> =  HttpRequest<B,H,P,Q>
