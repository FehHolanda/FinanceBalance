"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.router = void 0;
const express_1 = require("express");
const mongo_get_users_1 = require("../repositories/get-users/mongo-get-users");
const mongo_create_user_1 = require("../repositories/create-user/mongo-create-user");
const get_users_1 = require("../controllers/get-users");
const create_user_1 = require("../controllers/create-user");
const yup = __importStar(require("yup"));
const Validation_1 = require("../shared/middlewares/Validation");
const get_user_by_id_1 = require("../controllers/get-user-by-id");
const mongo_get_user_id_1 = require("../repositories/get-user-by-id/mongo-get-user-id");
const update_user_1 = require("../controllers/update-user");
const mongo_update_user_1 = require("../repositories/update-user/mongo-update-user");
exports.router = (0, express_1.Router)();
exports.router.get("/users", (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    query: getSchema(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
})), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoGetUsersRepository = new mongo_get_users_1.MongoGetUsersRepository();
    const getUsersController = new get_users_1.GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = yield getUsersController.handle({
        query: req.query,
    });
    res.send(body).status(statusCode);
}));
exports.router.get("/user", (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    query: getSchema(yup.object().shape({
        id: yup.string().required(),
    })),
})), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoGetUserByIdRepository = new mongo_get_user_id_1.MongoGetUserByIdRepository();
    const getUserByIdController = new get_user_by_id_1.GetUserByIdController(mongoGetUserByIdRepository);
    const { body, statusCode } = yield getUserByIdController.handle({
        query: req.query,
    });
    res.send(body).status(statusCode);
}));
exports.router.post("/user", (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    body: getSchema(yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    })),
})), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoCreateUserRepository = new mongo_create_user_1.MongoCreateUserRepository;
    const createUserController = new create_user_1.CreateUserController(mongoCreateUserRepository);
    const { body, statusCode } = yield createUserController.handle({
        body: req.body,
    });
    res.send(body).status(statusCode);
}));
exports.router.put("/user", (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    body: getSchema(yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    })),
})), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoUpdateUserRepository = new mongo_update_user_1.MongoUpdateUserRepository;
    const updateUserController = new update_user_1.UpdateUserController(mongoUpdateUserRepository);
    const { body, statusCode } = yield updateUserController.handle({
        body: req.body,
    });
    res.send(body).status(statusCode);
}));
