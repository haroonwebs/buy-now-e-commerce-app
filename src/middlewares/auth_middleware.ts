import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

// middleware for admin access
const Admin_Token = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        success: false,
        message:
          "Unauthorized User, Token not found. Please login first to use aur services",
      });
    }
    const Decoded_Token = Jwt.verify(
      token,
      config.jwt_secret as any
    ) as JwtPayload;
    const userRole = Decoded_Token.user.user_role;
    if (userRole !== "admin") {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized attempt, Only admin is Authorized for these Services",
      });
    }
    (req as any).user = Decoded_Token.user;
    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// middleware for user access

const User_Token = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        success: false,
        message:
          "Unauthorized User, Token not found. Please login first to use aur services",
      });
    }
    const Decoded_Token = Jwt.verify(
      token,
      config.jwt_secret as any
    ) as JwtPayload;
    const userRole = Decoded_Token.user.user_role;
    if (userRole !== "user") {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized attempt, Only Authorized user has access to these Services",
      });
    }
    (req as any).user = Decoded_Token.user;
    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { Admin_Token, User_Token };
