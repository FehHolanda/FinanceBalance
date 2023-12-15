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
exports.IsAuthenticatedController = void 0;
const http_status_codes_1 = require("http-status-codes");
class IsAuthenticatedController {
    constructor(getUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!httpRequest.headers)
                    return {
                        statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                        body: "Usuario não autenticado",
                    };
                const user = yield this.getUserByIdRepository.getUserById(httpRequest.headers.id);
                if (!httpRequest.headers || !user)
                    return {
                        statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                        body: "Usuario não autenticado",
                    };
                return {
                    statusCode: http_status_codes_1.StatusCodes.OK,
                    body: user,
                };
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
exports.IsAuthenticatedController = IsAuthenticatedController;
