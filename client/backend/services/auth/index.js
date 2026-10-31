import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { errorHandler } from "@ayush-kumar-mishra-prog/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import router from "./routers/userRouter.js";
import { connectDB } from "../../shared/index.js";
const port = process.env.PORT || 3001;
app.use(cookieParser());

const startServer = async () => {
  try {
    await connectDB(mongoose);
    app.listen(port, () => console.log(`port ${port} is running`));
  } catch (error) {
    console.error("Failed to start auth service:", error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  console.log(port);
  res.send("Auth server started");
});

app.use("/api/v1/auth", router);
app.use(errorHandler);
startServer();
