import Doctor from "../models/doctorModel";
import { Request, Response } from "express";
import User from "../models/userModel";

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `AllUsers Admin_Controller ${error.message}`,
    });
  }
};

export const allDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).send({
          success: true,
          message: "Doctors fetched successfully",
          data: doctors,
        });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `AllDoctors Admin_Controller ${error.message}`,
      });
    }
  };

export const changeAccountStatus = async (req: Request, res: Response) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
        const user = await User.findOne({ _id: doctor!.userId });

        const notifcation = user!.notifcation;
        notifcation.push({
          type: "doctor-account-request-updated",
          message: `Your doctor account has been changed to ${status} `,
          onClickPath: "/notification",
        });

        user!.isDoctor = status === "approved" ? true : false;
        await user!.save();
        res.status(201).send({
          success: true,
          message: "Account Status Updated",
          data: doctor,
        });
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `ChangeAccountStatus Admin_Controller ${error.message}`,
      });
    }
  };
