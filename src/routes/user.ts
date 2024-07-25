import express from "express";
import {
  allDoctors,
  allUser,
  applyForADoctor,
  bookAppointmentWithADoctor,
  bookingAvailability,
  deleteAllNotification,
  info,
  login,
  notifications,
  userAppointment,
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

userRouter.patch("/apply-f-doctor", AuthSign, applyForADoctor);

userRouter.get("/all-doctors", AuthSign, allDoctors);

userRouter.post("/book-appointmenaWith-Doctor", AuthSign, bookAppointmentWithADoctor);

userRouter.post("/booking-availability", AuthSign, bookingAvailability);

userRouter.get("/user-appointments", AuthSign, userAppointment);


export default userRouter;
