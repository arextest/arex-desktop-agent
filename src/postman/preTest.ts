import {Request, Response} from "express";

export function preTest(req:Request,expressRes:Response) {
    expressRes.send({name:'zt'})
}
