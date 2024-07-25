import express from "express";

import { AuthSign } from "../middlewares/authMiddleware";
import { appointDoctor, doctorInfo, getDoctorById, updateInfo } from "../controllers/doctorCtrl";

const doctorRouter = express.Router();

doctorRouter.get("/doctor_info", AuthSign, doctorInfo);

doctorRouter.patch("/update_doctor_info", AuthSign, updateInfo);

doctorRouter.get("/doctor_id", AuthSign, getDoctorById);

doctorRouter.get("/doctor_appointment", AuthSign, appointDoctor);

export default doctorRouter;
