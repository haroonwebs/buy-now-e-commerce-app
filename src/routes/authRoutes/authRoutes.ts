import express from "express";
import { Register_User } from "../../controllers/authControllers/authControllers";

const userRoutes = express.Router();

userRoutes.post("/register", Register_User);

export default userRoutes;
