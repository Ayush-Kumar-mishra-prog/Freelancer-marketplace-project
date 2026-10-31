import express from "express";

import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/post.controller.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

// Create project
router.post(
  "/create",
  upload.single("project_image"),
  createProject
);

// Get all projects
router.get(
  "/all",
  getAllProjects
);

// Get single project
router.get(
  "/:id",
  getProjectById
);

// Update project
router.put(
  "/:id",
  upload.single("project_image"),
  updateProject
);

// Delete project
router.delete(
  "/:id",
  deleteProject
);

export default router;