import {Request, Response, NextFunction} from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema, property: 'body'|'query'|'params')=>{
    return(req: Request, res: Response, next: NextFunction):void => {
        const {error} = schema.validate(req[property]);
        if(error){
            res.status(400).json({
                success: false,
                error: "Validation error",
                message: (error.details[0].message).replace(/"/g,'')
            })
        }else{
            next()
        }
    }
}