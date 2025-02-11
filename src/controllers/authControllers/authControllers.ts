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
import _ from "lodash";

// scheema to for the inputs validations from the user
const Auth_Schema_signup = Joi.object({
  user_name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  user_role: Joi.string().valid(UserRole.Admin, UserRole.User),
  otp: Joi.number(),
  otp_expiry: Joi.date(),
  active: Joi.boolean(),
});

// scheema for login user
const Auth_Schema_login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const Register_User = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { error, value } = Auth_Schema_signup.validate(req.body as authTypes);
    if (error) {
      return res.status(401).json({
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
    const otp_expiry = new Date(Date.now() + 5 * 60 * 1000); // 1 minutes from now

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

    // const token = jwt.sign({ userid: user.id }, config.jwt_secret as string);
    // res.cookie("authToken", token, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: false,
    //   maxAge: config.jwt_expiry as any,
    // });
    return res.status(201).json({
      success: true,
      // message: "User Successfuly Registerd ",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error}`,
    });
  }
};

// login controller

export const Signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error, value } = Auth_Schema_login.validate(req.body);
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.details.map((details) => details.message),
      });
    }
    const { password, email } = value;
    const user_Repo = AppDataSource.getRepository(User);
    const Existing_User = await user_Repo.findOne({ where: { email: email } });
    if (!Existing_User) {
      return res.status(409).json({
        success: false,
        message:
          "User with this email Not exist. Please Register your account !",
      });
    }
    const Compare_Password = await bcrypt.compare(
      password,
      Existing_User.password
    );
    if (!Compare_Password) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized person. Password not matched !",
      });
    }
    if (Existing_User.isVerified === false) {
      Existing_User.otp = null as any;
      Existing_User.otp_expiry as any;
      await user_Repo.save(Existing_User);

      // otp generation function
      const otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      }) as any;

      const otp_expiry = new Date(Date.now() + 5 * 60 * 1000); // otp expiry 5 minutes from now

      Existing_User.otp = otp;
      Existing_User.otp_expiry = otp_expiry;
      await user_Repo.save(Existing_User);

      // send email to verify the user using otp
      const sentMail = Send_Verify_Otp(Existing_User.email, Existing_User.otp);
      return res.status(409).json({
        success: false,
        message:
          "User not verified,OTP sent to your email. Please first Verify your account using OTP !",
      });
    }
    const user = _.omit(Existing_User, [
      "password",
      "otp_expiry",
      "otp",
      "createdAt",
      "updatedAt",
    ]);
    console.log("response at login controller", user);
    const token = jwt.sign({ user }, config.jwt_secret as string);
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
      maxAge: config.jwt_expiry as unknown as number,
    });
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "somthing went worng while creating Jwt",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login Successfuly",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error}`,
    });
  }
};
