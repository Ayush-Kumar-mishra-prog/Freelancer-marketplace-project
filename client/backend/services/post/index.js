import express from "express";
import path from "path";

import projectRoutes from "./routers/post.routes.js";
import dotenv from 'dotenv'
dotenv.config();

import connectDB from "../../shared/config/db.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDB(mongoose);
    app.listen(port, () => console.log(`port ${port} is running`));
  } catch (error) {
    console.error("Failed to start auth service:", error);
    process.exit(1);
  }
};

// Static uploads
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// Project routes
app.use("/api/projects", projectRoutes);

export default app;
startServer();