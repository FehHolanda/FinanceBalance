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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSchema = void 0;
const Validation_1 = require("../../shared/middlewares/Validation");
const yup = __importStar(require("yup"));
const getUsersValidation = (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    query: getSchema(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));
const getUserValidation = (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    query: getSchema(yup.object().shape({
        id: yup.string().required(),
    })),
}));
const createUserValidation = (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    body: getSchema(yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    })),
}));
const updateUserValidation = (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    body: getSchema(yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    })),
}));
const deleteUserValidation = (0, Validation_1.Validator)((getSchema) => ({
    //Validações
    query: getSchema(yup.object().shape({
        id: yup.string().required(),
    })),
}));
exports.ValidationSchema = {
    getUsersValidation: getUsersValidation,
    getUserValidation: getUserValidation,
    createUserValidation: createUserValidation,
    updateUserValidation: updateUserValidation,
    deleteUserValidation: deleteUserValidation
};
