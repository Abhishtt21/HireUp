import { User } from "../db/models/user.model.js";
import { asyncError } from "../middlewares/async.error.js"
import { ErrorHandler } from "../middlewares/error.js";
export const signup = asyncError (async (req,res,next)=>{
    const {name,email,phone,role,password} = req.body;
    if(!name|| !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill full form") )
    }

    const isEmail = await User.findOne({email});

    if(isEmail){
        return next(new ErrorHandler("Email already exist") )
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    })

    res.status(200).json({
        success:true,
        message:"User registered",
        user
    })
})