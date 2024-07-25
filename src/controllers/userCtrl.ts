import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";
import { JwtPayload } from "jsonwebtoken";
import Doctor from "../models/doctorModel";
import Appointment from "../models/appointModel";
import moment from "moment";

interface CustomNotification {
  type: string;
  message: string;
  onClickPath: string;
}

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exist", success: false });
    }

    const newUser = new User({ name, email, password });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Successfully created", success: true });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register User_Controller ${error.message}`,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide an email and password",
        success: false,
      });
    }

    const existingUser = (await User.findOne({ email })) as IUser;
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User Not Found", success: false });
    }

    const isMatch = await existingUser.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const token = await existingUser.getSignedJwtToken();

    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `LOgin User_Controller ${error.message}`,
    });
  }
};

export const info = async (req: JwtPayload, res: Response) => {
  try {
    const user = await User.findById({ _id: req.user });
    user!.password = undefined as any;
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Info User_Controller ${error.message}`,
    });
  }
};

export const allUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();

    res.status(200).send({
      success: false,
      message: `All Users`,
      data: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Info User_Controller ${error.message}`,
    });
  }
};

export const notifications = async (req: JwtPayload, res: Response) => {
  try {
    const user = await User.findById({ _id: req.user });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const myNotification: CustomNotification[] = user.seenNotification || [];
    const notifcation: CustomNotification[] = user.notifcation || [];

    myNotification.push(...notifcation);
    user.notifcation = [];
    user.seenNotification = myNotification;

    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as read",
      data: {
        notifcation: updatedUser.notifcation,
        seenNotification: updatedUser.seenNotification,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Notifications User_Controller ${error.message}`,
    });
  }
};

export const deleteAllNotification = async (req: JwtPayload, res: Response) => {
  try {
    const user = await User.findById({ _id: req.user });
    user!.notifcation = [];
    user!.seenNotification = [];
    const updatedUser = await user!.save();
    updatedUser!.password = undefined as any;

    res.status(200).send({
      success: true,
      message: "Your notifications has been deleted successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `DeleteNotification User_Controller ${error.message}`,
    });
  }
};

export const applyForADoctor = async (req: Request, res: Response) => {
  try {
    const newDoc = new Doctor({ ...req.body, status: "pending" });
    await newDoc.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const notifcation = adminUser!.notifcation;
    notifcation!.push({
      type: "apply-to-be-a",
      message: `${newDoc.firstName} ${newDoc.lastName} Has Applied For A Doctor Account`,
      onClickPath: "/admin/doctors", 
    });

    await User.findByIdAndUpdate(adminUser!._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor account applied Successfully",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Apply_F_Doctor User_Controller ${error.message}`,
    });
  }
};

export const allDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Doctors Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error:any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `AllDoctor User_Controller ${error.message}`,
    });
  }
};

export const bookAppointmentWithADoctor = async (req: Request, res: Response) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user!.notifcation.push({
      type: "Appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });

    await user!.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked successfully",
    });
  } catch (error:any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `BookAppointmentWithADoctor User_Controller ${error.message}`,
    });
  }
};

export const bookingAvailability = async (req: Request, res: Response) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const doctorId = req.body.doctorId;

    const appointments = await Appointment.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error:any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `BookingAvailability User_Controller ${error.message}`,
    });
  }
};

export const userAppointment = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch Successfully",
      data: appointments,
    });
  } catch (error:any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `UserAppointment User_Controller ${error.message}`,
    });
  }
};
