import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthencticated: RequestHandler =async (req,res,next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros:{default:"não autenticado"}        
        });
    }

    const [type,token] = authorization.split(" ");

    if(type !== "Bearer" || token !== "token"){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros:{default:"não autenticado"}        
        });    
    }    
    
    return next();
};