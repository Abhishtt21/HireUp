import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";


const app = express();
dotenv.config();

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))
export default app;