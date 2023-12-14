import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { GetUserByIdParams, IGetUserByIdRepository } from "../../../controllers/users/get-user-by-id/protocols";

export class MongoGetUserByIdRepository implements IGetUserByIdRepository{
    async getUserById(params: GetUserByIdParams): Promise<Omit<User,"password">> {

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