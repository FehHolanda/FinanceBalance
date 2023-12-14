import { RequestHandler } from "express";

export const ensureAuthencticated: RequestHandler =async (req,res,next) => {

    
    return next();
};