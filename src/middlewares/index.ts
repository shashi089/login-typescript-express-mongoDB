import express from "express"
import {get, merge} from "lodash";
import { getUserBySessionToken } from "../db/user";

export const isAuthenticated= async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
    try {
        const sessionToken =req.cookies['SHASHI-AUTH']

        if(!sessionToken){
            return res.sendStatus(403)
        }
        const existingUser = getUserBySessionToken(sessionToken);
        if(!existingUser){
            return res.sendStatus(403)
        }
          console.log(existingUser,"existingUser")

        merge(req,{identity:existingUser})
        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
        
    }
}

export const isOwner= async(req:express.Request, res:express.Response, next:express.NextFunction)=>{

    try {
        const {id}= req.params;
        const currentUserId = get(req,'identity._id');
        if(!currentUserId){
            return res.sendStatus(403)
        }
        if(currentUserId!==id){
            return res.sendStatus(403)
        }
   next()
    } catch (error) {
        
    }
}
