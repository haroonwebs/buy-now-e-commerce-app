import express from "express";
import {
  All_Products,
  Create_Product,
  Delete_Product,
  Product_By_Id,
  Update_Product,
} from "../../controllers/productControllers/productControllers";
import { upload } from "../../middlewares/multer_middleware";
import { Admin_Token } from "../../middlewares/auth_middleware";

const productRoute = express.Router();
productRoute.post(
  "/create",
  upload.single("Photo_file"),
  Admin_Token,
  Create_Product
);
productRoute.get("/getall", Admin_Token, All_Products);
productRoute.get("/:productId", Product_By_Id);
productRoute.delete("/delete/:productId", Delete_Product);
productRoute.patch("/update/:productId", Update_Product);

export default productRoute;
