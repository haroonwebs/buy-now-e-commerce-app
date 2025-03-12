import express from "express";
import { AppDataSource } from "./database/data-source";
import companyRoutes from "./routes/companyRoutes/companyRoutes";
import productRoute from "./routes/productRoutes/productRoute";
import { config } from "./config/config";
import userRoutes from "./routes/authRoutes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const port = config.port;

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000" ,"http://localhost:4200"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(() => {
    console.log("Postgres is connected successfully");
    app.use("/api/v1/company", companyRoutes);
    app.use("/api/v1/product", productRoute);
    app.use("/api/v1/user", userRoutes);
  })
  .catch((e: any) => {
    console.log("error while connecting database" + e);
  });

app.listen(port, () => {
  console.log(`app is running at prot ${port}`);
});
