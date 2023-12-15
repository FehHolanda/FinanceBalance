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
exports.AuthController = void 0;
const signin_1 = require("./signin");
const mongo_get_user_username_1 = require("../../repositories/user/get-user-by-username/mongo-get-user-username");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //chamada do controller
    const mongoGetUserByUsernameRepository = new mongo_get_user_username_1.MongoGetUserByUsernameRepository();
    const signinController = new signin_1.SigninController(mongoGetUserByUsernameRepository);
    const { body, statusCode } = yield signinController.handle({
        body: req.body,
    });
    res.status(statusCode).json(body);
});
exports.AuthController = {
    signin: signin,
};
