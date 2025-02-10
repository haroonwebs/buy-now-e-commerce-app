import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config";
import fs from "fs";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret, // Click 'View API Keys' above to copy your API secret
});

const Upload_On_Cloudinary = async (localfilepath: any): Promise<any> => {
  try {
    if (!localfilepath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    // console.log("error in cloudinary ", response);
    fs.unlink(localfilepath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully.");
      }
    });

    return response;
  } catch (error: any) {
    fs.unlinkSync(localfilepath); //this line remove the file from the local server if any error is produced during uploading file
    return null;
  }
};

export { Upload_On_Cloudinary };
