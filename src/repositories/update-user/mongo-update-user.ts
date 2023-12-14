import { ObjectId } from "mongodb";
import { IUpdateUserRepository, UpdateUserParams } from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUpdateUserRepository implements IUpdateUserRepository{
    async updateUser(params: UpdateUserParams): Promise<Omit<User,"password">> {
        
        await MongoClient.db
            .collection("users")
            .updateOne(
                {_id : new ObjectId(params.id)},
                {$set:{
                    ...params,
                }});    

        const user = await MongoClient.db
            .collection<Omit<User,"id">>("users")
            .findOne({_id:new ObjectId(params.id)});

        if(!user){
            throw new Error("User not created");
        }

        const {_id,password,...rest} = user;
       
        return {id:_id.toHexString(), ...rest};
    }
}