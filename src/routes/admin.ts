import express from "express";
import { AuthSign } from "../middlewares/authMiddleware";
import { allDoctors, allUsers, changeAccountStatus } from "../controllers/adminCtrl";

const adminRouter = express.Router();

adminRouter.get("/doctor_info", AuthSign, allUsers);

adminRouter.get("/update_doctor_info", AuthSign, allDoctors);

adminRouter.post("/doctor_id", AuthSign, changeAccountStatus);

export default adminRouter;
