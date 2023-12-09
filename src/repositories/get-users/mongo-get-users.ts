import { IGetUsersrepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersrepository{
    async getUsers(): Promise<User[]> {
        return [{
            name: "Felipe",
            username: "felcra",
            password:"Admin",
        }];
    }

}