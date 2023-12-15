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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninController = void 0;
const http_status_codes_1 = require("http-status-codes");
const JWTservice_1 = require("../../../shared/services/JWTservice");
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
                const _a = yield this.getUserByUsernameRepository.getUserByUsername(httpRequest.body), { password } = _a, rest = __rest(_a, ["password"]);
                if (password === httpRequest.body.password) {
                    const acessToken = JWTservice_1.JWTService.sign({ uid: rest.id });
                    if (acessToken === "JET_SECRET_NOT_FOUND") {
                        return {
                            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                            body: "Erro ao gerar token de acesso"
                        };
                    }
                    return {
                        statusCode: http_status_codes_1.StatusCodes.OK,
                        body: { accessToken: acessToken },
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
