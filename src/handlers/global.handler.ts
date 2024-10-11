import { Request, Response } from "express";

export const handleCatch = async(res: Response, error: any)=>{
    console.log("handle catch > ",error);
    res.status(error.status ?? 400).send({
        success:false,
        error: error.type,
        message: error.message ?? "Something went wrong"
    });
}

export const handleResponse = async(res: Response, payload: any)=>{
    console.log("handle response > ",payload);
    res.status(payload.status ?? 200).send({
        success:true,
        data: payload.data,
        message: payload.message
    });
}