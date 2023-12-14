import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { DeleteUserParams, IDeleteUserRepository } from "../../controllers/delete-user/protocols";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
    async deleteUser(params: DeleteUserParams) {

        const user = await MongoClient.db
            .collection("users")
            .findOne(
                { _id: new ObjectId(params.id) });

        if (!user) {
            throw new Error("User not created");
        }

        const { deletedCount } = await MongoClient.db
            .collection<Omit<User, "id">>("users")
            .deleteOne({ _id: new ObjectId(params.id) });

        if (!deletedCount) {
            throw new Error("User not deleted");
        }
    }
}