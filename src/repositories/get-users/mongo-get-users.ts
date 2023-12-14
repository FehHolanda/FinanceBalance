import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository{
    async getUsers(): Promise<Omit<User,"password">[]> {
        const users = await MongoClient.db.collection<Omit<User,"id">>("users").find({}).toArray();

        return users.map(({_id,password,...rest}) => ({...rest,id:_id.toHexString()}));
    }

}