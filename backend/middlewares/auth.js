import jwt from "jsonwebtoken"
import { User } from "../db/models/user.model.js"
import { ErrorHandler } from "./error.js"
import { asyncError } from "./async.error.js"
export const isAuthorized = asyncError(async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("User not authorized",401));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
})