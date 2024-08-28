import mongoose from "mongoose";

export const dbConnection = async () =>{
    try {
    await mongoose.connect(process.env.MONGODB_URI,{
        dbName:"HireUp"
    })
    console.log("Database connection successfull");
}

    catch(err){
        console.log("Database connection error",err);
        process.exit(1);
    }
}