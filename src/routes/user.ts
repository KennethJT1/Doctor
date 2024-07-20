import express from "express";
import {
  allUser,
  deleteAllNotification,
  info,
  login,
  notifications,
  userRegistration,
} from "../controllers/userCtrl";
import { AuthSign } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", userRegistration);

userRouter.post("/login", login);

userRouter.get("/info", AuthSign, info);

userRouter.get("/all_users", allUser);

userRouter.get("/users_notification", AuthSign, notifications);

userRouter.delete(
  "/delete_users_notification",
  AuthSign,
  deleteAllNotification
);

export default userRouter;
