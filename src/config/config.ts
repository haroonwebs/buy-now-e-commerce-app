import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_password: process.env.DB_PASSWORD,
  db_username: process.env.DB_USERNAME,
  db_name: process.env.DB_Name,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXPIRY,
  user_email: process.env.USER_EMAIL,
  email_password: process.env.EMAIL_PASSWORD,
};

export const config = Object.freeze(_config);
