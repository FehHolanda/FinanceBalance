import * as jwt from "jsonwebtoken";


interface IJwtData{
    uid:string;
}

const sign = (data:IJwtData): string | "JET_SECRET_NOT_FOUND" => {
    if(!process.env.JWT_SECRET_STRING) return "JET_SECRET_NOT_FOUND";

    return jwt.sign(data,process.env.JWT_SECRET_STRING,{expiresIn:"1h"});
};

const verify = (token:string) : IJwtData | "JET_SECRET_NOT_FOUND" | "INVALID_TOKEN"  => {
    if(!process.env.JWT_SECRET_STRING) return "JET_SECRET_NOT_FOUND";

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET_STRING);
        if(typeof decode === "string"){
            return "INVALID_TOKEN";
        }else {
            return decode as IJwtData;
        }
    }catch{
        return "INVALID_TOKEN";
    }


};


export const JWTService = {
    sign,
    verify
};