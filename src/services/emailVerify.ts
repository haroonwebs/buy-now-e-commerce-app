import nodemailer from "nodemailer";
import { config } from "../config/config";

export const Send_Verify_Otp = (email: string, otp: any) => {
  try {
    const Sender = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.user_email,
        pass: config.email_password,
      },
    });

    const Options = {
      from: "haroonch8028@gmail.com",
      to: email,
      subject: "Your OTP to Verify",
      text: `${otp} its your OTP code for secure verification, please enter this code to verify your account`,
    };

    Sender.sendMail(Options, function (error: any, info: any) {
      if (error) {
        console.log("something error while sending email", error);
      } else {
        console.log("email sent successfully", info.response);
      }
    });
  } catch (error: any) {
    console.log("Internal server error in sending email", error);
  }
};
