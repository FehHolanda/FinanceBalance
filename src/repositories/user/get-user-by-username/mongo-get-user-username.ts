import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { IMongoGetUserByUsernameRepository, SigninParams } from "../../../controllers/auth/signin/protocols";

export class MongoGetUserByUsernameRepository implements IMongoGetUserByUsernameRepository{
    async getUserByUsername(params: SigninParams): Promise<User> {

        const user = await MongoClient.db
            .collection<Omit<User,"id">>("users")
            .findOne({username: params.username});

        if(!user){
            throw new Error("User not found");
        }

        const {_id,...rest} = user;

        return {id:_id.toHexString(),...rest};
    }

}