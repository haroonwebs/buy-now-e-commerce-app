import { Request, Response } from "express";
import Joi from "joi";
import { User, UserRole } from "../../models/user_model";
import { authTypes } from "./authTypes";
import otpgenerator from "otp-generator";
import { AppDataSource } from "../../database/data-source";
import bcrypt from "bcrypt";
import { Send_Verify_Otp } from "../../services/emailVerify";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

// scheema to for the inputs validations from the user
const Auth_Schema = Joi.object({
  user_name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  user_role: Joi.string().valid(UserRole.Admin, UserRole.User),
  otp: Joi.number(),
  otp_expiry: Joi.date(),
  active: Joi.boolean(),
});

export const Register_User = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { error, value } = Auth_Schema.validate(req.body as authTypes);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((details) => details.message),
      });
    }

    const { user_name, email, password }: authTypes = value;
    // otp generation function
    const otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    }) as any;
    // generating expiry for otp
    const otp_expiry = new Date(Date.now() + 1 * 60 * 1000); // 1 minutes from now

    const user_Repo = AppDataSource.getRepository(User);
    const Existing_User = await user_Repo.findOne({ where: { email: email } });
    if (Existing_User) {
      return res.status(409).json({
        success: false,
        message: "user with this email already exist !",
      });
    }

    const Hash_Password = await bcrypt.hash(password, 10);
    const user = user_Repo.create({
      user_name,
      email,
      otp,
      password: Hash_Password,
      otp_expiry,
    });
    await user_Repo.save(user);

    // send email to verify the user using otp
    const sentMail = Send_Verify_Otp(user.email, user.otp);

    const token = jwt.sign({ userid: user.id }, config.jwt_secret as string);
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
      maxAge: config.jwt_expiry as any,
    });

    if (token) {
      return res.status(201).json({
        success: true,
        message: "User Successfuly Registerd ",
        user,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error}`,
    });
  }
};
