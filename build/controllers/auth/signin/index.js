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
exports.SigninController = void 0;
const http_status_codes_1 = require("http-status-codes");
class SigninController {
    constructor(getUserByUsernameRepository) {
        this.getUserByUsernameRepository = getUserByUsernameRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!httpRequest.body)
                    return {
                        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                        body: "need a body",
                    };
                const { password } = yield this.getUserByUsernameRepository.getUserByUsername(httpRequest.body);
                if (password === httpRequest.body.password) {
                    return {
                        statusCode: http_status_codes_1.StatusCodes.OK,
                        body: "token",
                    };
                }
                else {
                    return {
                        statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                        body: "Username e Senha inválidos",
                    };
                }
            }
            catch (error) {
                return {
                    statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    body: error.message,
                };
            }
        });
    }
}
exports.SigninController = SigninController;
