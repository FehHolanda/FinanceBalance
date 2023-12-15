import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface  IisAuthenticatedController {
    handle(httpRequest:HttpRequestSIsAuthenticated<IsAuthenticatedParams>): Promise<HttpResponse<Omit<User,"password">>>;
}

export interface IsAuthenticatedParams {    
    id:string
}

export type HttpRequestSIsAuthenticated<H,B=void,Q=void,P=void> =  HttpRequest<B,H,P,Q>
