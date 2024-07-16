import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";

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

// export const userRegistration = async (req: Request, res: Response) => {
//   try {
//   } catch (error:any) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register User_Controller ${error.message}`,
//     });
//   }
// };

// export const userRegistration = async (req: Request, res: Response) => {
//   try {
//   } catch (error:any) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register User_Controller ${error.message}`,
//     });
//   }
// };

// export const userRegistration = async (req: Request, res: Response) => {
//   try {
//   } catch (error:any) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register User_Controller ${error.message}`,
//     });
//   }
// };

// export const userRegistration = async (req: Request, res: Response) => {
//   try {
//   } catch (error:any) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register User_Controller ${error.message}`,
//     });
//   }
// };
