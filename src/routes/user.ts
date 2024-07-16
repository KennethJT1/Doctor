import express from "express";
import { login, userRegistration } from "../controllers/userCtrl";

const userRouter = express.Router();

userRouter.post(("/register"), userRegistration)

userRouter.post(("/login"), login)

export default userRouter;
