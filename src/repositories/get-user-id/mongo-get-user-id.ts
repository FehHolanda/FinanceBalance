import { ObjectId } from "mongodb";
import { GetUserIdParams, IGetUserIdRepository } from "../../controllers/get-user-id/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUserIdRepository implements IGetUserIdRepository{
    async getUserId(params: GetUserIdParams): Promise<Omit<User,"password">> {

        const user = await MongoClient.db
            .collection<Omit<User,"id">>("users")
            .findOne({_id: new ObjectId(params.id)});

        if(!user){
            throw new Error("User not found");
        }

        const {_id,password,...rest} = user;

        return {id:_id.toHexString(),...rest};
    }

}