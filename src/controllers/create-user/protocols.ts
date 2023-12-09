import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface ICreateUserController {
    handle(): Promise<HttpResponse<User[]>>;
}

export interface CreateUserParams {
    name: string;
    username: string;
    password: string;
}

export interface ICreateUserRepository{
    createUser(params:CreateUserParams): Promise<User>;
}