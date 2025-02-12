import { Response, Request } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../models/user_model";
import _ from "lodash";

const Get_All_Users = async (req: Request, res: Response): Promise<any> => {
  try {
    const user_Repo = AppDataSource.getRepository(User);
    let users;
    users = await user_Repo.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Something goes Wrong While Fetching Users !",
      });
    }
    users = users.map((user) =>
      _.omit(user, ["password", "otp_expiry", "otp", "createdAt", "updatedAt"])
    );
    return res.status(200).json({
      success: true,
      message: "All Users",
      users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error}`,
    });
  }
};

export { Get_All_Users };
