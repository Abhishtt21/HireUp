import jwt from "jsonwebtoken"
import { User } from "../db/models/user.model"
import { ErrorHandler } from "./error"
import { asyncError } from "./async.error"
export const isAuthorized = asyncError(async(req,res,next)=>{
    const token = req.cookies
    if(!token){
        return next(new ErrorHandler("User not authorized",400));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
})