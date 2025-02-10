import { Response, Request } from "express";
import Joi from "joi";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/user_model";

const otpSchema = Joi.object({
  otp: Joi.string().min(6),
});

const OTP_VERIFY = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error, value } = otpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message),
      });
    }

    const { otp } = value;

    const userRepo = AppDataSource.getRepository(User);

    const userExist = await userRepo.findOneBy({ otp });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "Wrong OTP, please provide a valid OTP",
      });
    }

    const currentDate = new Date();
    const isoCurrentDate = currentDate.toISOString();

    const otp_expiryDate = userExist.otp_expiry.toDateString();

    if (otp_expiryDate < isoCurrentDate) {
      userExist.otp = null as any;
      userExist.otp_expiry = null as any;
      await userRepo.save(userExist);
      return res.status(409).json({
        success: false,
        message: "OTP is Expired",
      });
    }
    // Update user verification status
    userExist.isVerified = true;
    userExist.otp = null as any; // Clear OTP after successful verification
    userExist.active = true;
    userExist.otp_expiry = null as any;
    await userRepo.save(userExist);
    return res.status(200).json({
      success: true,
      message: "User Verified Successfully",
      user: userExist,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message || error}`,
    });
  }
};

export { OTP_VERIFY };
