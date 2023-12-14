"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongo_get_users_1 = require("../../repositories/user/get-users/mongo-get-users");
const get_users_1 = require("./get-users");
const get_user_by_id_1 = require("./get-user-by-id");
const mongo_get_user_id_1 = require("../../repositories/user/get-user-by-id/mongo-get-user-id");
const mongo_create_user_1 = require("../../repositories/user/create-user/mongo-create-user");
const create_user_1 = require("./create-user");
const mongo_update_user_1 = require("../../repositories/user/update-user/mongo-update-user");
const update_user_1 = require("./update-user");
const mongo_delete_user_1 = require("../../repositories/user/delete-user/mongo-delete-user");
const delete_user_1 = require("./delete-user");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoGetUsersRepository = new mongo_get_users_1.MongoGetUsersRepository();
    const getUsersController = new get_users_1.GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = yield getUsersController.handle({
        query: req.query,
    });
    res.send(body).status(statusCode);
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoGetUserByIdRepository = new mongo_get_user_id_1.MongoGetUserByIdRepository();
    const getUserByIdController = new get_user_by_id_1.GetUserByIdController(mongoGetUserByIdRepository);
    const { body, statusCode } = yield getUserByIdController.handle({
        query: req.query,
    });
    res.send(body).status(statusCode);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoCreateUserRepository = new mongo_create_user_1.MongoCreateUserRepository;
    const createUserController = new create_user_1.CreateUserController(mongoCreateUserRepository);
    const { body, statusCode } = yield createUserController.handle({
        body: req.body,
    });
    res.send(body).status(statusCode);
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoUpdateUserRepository = new mongo_update_user_1.MongoUpdateUserRepository;
    const updateUserController = new update_user_1.UpdateUserController(mongoUpdateUserRepository);
    const { body, statusCode } = yield updateUserController.handle({
        body: req.body,
    });
    res.send(body).status(statusCode);
});
const erase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoDeleteUserRepository = new mongo_delete_user_1.MongoDeleteUserRepository;
    const deleteUserController = new delete_user_1.DeleteUserController(mongoDeleteUserRepository);
    const { body, statusCode } = yield deleteUserController.handle({
        query: req.query,
    });
    res.send(body).status(statusCode);
});
exports.UserController = {
    create: create,
    getAll: getAll,
    getUser: getUser,
    update: update,
    delete: erase
};
