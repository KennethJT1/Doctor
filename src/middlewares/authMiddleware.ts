import { JwtPayload, verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";

export const AuthSign = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
  verify(token, process.env.JWT_SECRET!, (err:any, decode:any) => {
      if (err) {
        return res.status(200).send({
          message: "Not Authorized",
          success: false,
        });
      } else {
        req.user = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Authorization Failed",
      success: false,
    });
  }
};
