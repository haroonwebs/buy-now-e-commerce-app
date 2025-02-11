import express from "express";
import {
  Logout,
  Register_User,
  Signin,
} from "../../controllers/authControllers/authControllers";
import { OTP_VERIFY } from "../../controllers/authVerifyOTP";

const userRoutes = express.Router();

userRoutes.post("/register", Register_User);
userRoutes.post("/verify_otp", OTP_VERIFY);
userRoutes.post("/login", Signin);
userRoutes.post("/logout", Logout);

export default userRoutes;
