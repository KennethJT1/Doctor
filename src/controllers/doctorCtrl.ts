import { JwtPayload } from "jsonwebtoken";
import Doctor from "../models/doctorModel";
import { Request, Response, NextFunction } from "express";
import Appointment from "../models/appointModel";
import User from "../models/userModel";

interface CustomNotification {
  type: string;
  message: string;
  onCLickPath: string;
}

export const doctorInfo = async (req: JwtPayload, res: Response) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user });
    res.status(200).send({
      success: true,
      message: "Doctor info fetch successfully",
      data: doctor,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Info Doctor_Controller ${error.message}`,
    });
  }
};

export const updateInfo = async (req: JwtPayload, res: Response) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user },
      req.body
    );

    res.status(201).send({
      success: true,
      message: "Doctor info Updated successfully",
      data: doctor,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `UpdateInfo Doctor_Controller ${error.message}`,
    });
  }
};

export const getDoctorById = async (req: JwtPayload, res: Response) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user });

    res.status(200).send({
      success: true,
      message: "Doctor Fetched",
      data: doctor,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `DoctorById Doctor_Controller ${error.message}`,
    });
  }
};

export const appointDoctor = async (req: JwtPayload, res: Response) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user });
    const appointments = await Appointment.find({
      doctorId: doctor!._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Appointment Doctor_Controller ${error.message}`,
    });
  }
};

export const updateDoctorStatus = async (req: JwtPayload, res: Response) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await Appointment.findByIdAndUpdate(appointmentsId, {
      status,
    });

    if (!appointments) {
      return res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }

    const user = await User.findById(appointments.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const notifcation: CustomNotification[] = user.notifcation || [];
    notifcation.push({
      type: "status-updated",
      message: `Your appointment has been updated to ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    user.notifcation = notifcation;

    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `UpdateStatus Doctor_Controller ${error.message}`,
    });
  }
};