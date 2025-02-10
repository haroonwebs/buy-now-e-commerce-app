import express from "express";
import { Register_User } from "../../controllers/authControllers/authControllers";
import { OTP_VERIFY } from "../../controllers/authVerifyOTP";

const userRoutes = express.Router();

userRoutes.post("/register", Register_User);
userRoutes.post("/verify_otp", OTP_VERIFY);

export default userRoutes;
