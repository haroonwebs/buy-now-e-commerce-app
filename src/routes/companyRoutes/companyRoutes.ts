import express from "express";
import {
  Create_Company,
  Delect_Company,
  Get_Companes,
  Get_Single_Company,
  Update_Company,
} from "../../controllers/companyControllers/companyControllers";

const companyRoutes = express.Router();

companyRoutes.post("/create", Create_Company);
companyRoutes.get("/getall", Get_Companes);
companyRoutes.get("/:companyId", Get_Single_Company);
companyRoutes.patch("/update/:companyId", Update_Company);
companyRoutes.delete("/delete/:companyId", Delect_Company);

export default companyRoutes;
