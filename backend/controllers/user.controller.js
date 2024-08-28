import { User } from "../db/models/user.model.js";
import { asyncError } from "../middlewares/async.error.js"
import { ErrorHandler } from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
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

   sendToken(user,200,res,"User registered!");
})

export const login =asyncError(async (req,res,next)=>{
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide email,password and role",400))
    }
        const user = await User.findOne({email}).select("+password");
        if(!user){
          return next( new ErrorHandler("Wrong password or email",400))
        }

        const passwordmatch = await user.comparePassword(password);
        if(!passwordmatch){
            return next(new ErrorHandler("Wrong password or email",400))
        }

        if(user.role != role){
            return next(new ErrorHandler("User with selected role not found",400))
        }
        sendToken(user,200,res,"User LoggedIn")
    
})

export const logout = asyncError (async (req,res,next)=>{
    res.status(201).cookie("token",null,{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        message:"Logged Out"
    });
})