import express from "express";
import { login, logout, signup } from "../controllers/user.controller.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",login);
router.get("/logout",isAuthorized,logout);
export default router