import { RequestHandler } from "express";

export const ensureauthencticated: RequestHandler =async (req,res,next) => {

    
    return next();
};