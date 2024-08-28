import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:[3,"Name must contain atleast 3 Characters"],
        maxLength:[30,"Name cannot exceed 30 characters "]

    },

    email:{
        type:String,
        required: [true,"Please provide valid email"],
        validate: [validator.isEmail,"Please provide valid email"]

    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"]
    },
    password: {
        type: String,
        required: [true,"Please provide your password"],
        minLength:[8,"Password must contain atleast 8 characters"],
        maxLength:[32,"Password cannot exceed 32 Characters"],
        select: false

    },
    role:{
        type:String,
        required:[true,"Choose your role"],
        enum: ["JobSeeker","Employer"]
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    
})

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXP
    })
}

export const User  =mongoose.model("User",userSchema);