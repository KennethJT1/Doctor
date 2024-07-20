import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";
import { JwtPayload } from "jsonwebtoken";

interface CustomNotification {
  type: string;
  message: string;
  onCLickPath: string;
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

export const applyForADoctor = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Apply_F_Doctor User_Controller ${error.message}`,
    });
  }
};


export const notifications = async (req: JwtPayload, res: Response) => {
  try {
    const user = await User.findById({ _id: req.user });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
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
