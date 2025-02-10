import { UserRole } from "../../models/user_model";

export type authTypes = {
  id: number;
  user_name: string;
  email: string;
  password: string;
  user_role: UserRole;
  otp: number;
  otp_expiry: Date;
  active: boolean;
};
