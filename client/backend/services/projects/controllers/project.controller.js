



import Project from "../models/project.model.js";

// ===============================
export const createProject = async (req, res) => {
  try {
    const {
      freelancer,
      project_name,
      project_description,
      short_Discription,
      price,
      category,
      date,
      client,
      project_url,
      status,
    } = req.body;

    // Required fields
    if (
      !freelancer ||
      !project_name ||
      !project_description ||
      !price ||
      !category ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    let project_image = "";

    if (req.file) {
      project_image = `/uploads/projects/${req.file.filename}`;
    }

    const project = await Project.create({
      freelancer,
      project_name,
      project_description,
      short_Discription,
      price,
      category,
      date,
      client,
      project_url,
      status: status || "active",
      project_image,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL PROJECTS
// ===============================
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get All Projects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// ===============================
// GET SINGLE PROJECT
// ===============================
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
};

// ===============================
// UPDATE PROJECT
// ===============================
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const {
      project_name,
      project_description,
      short_Discription,
      price,
      category,
      date,
      client,
      project_url,
      status,
    } = req.body;

    // Update only fields that are provided
    if (project_name !== undefined) {
      project.project_name = project_name;
    }

    if (project_description !== undefined) {
      project.project_description = project_description;
    }

    if (short_Discription !== undefined) {
      project.short_Discription = short_Discription;
    }

    if (price !== undefined) {
      project.price = Number(price);
    }

    if (category !== undefined) {
      project.category = category;
    }

    if (date !== undefined) {
      project.date = date;
    }

    if (client !== undefined) {
      project.client = client;
    }

    if (project_url !== undefined) {
      project.project_url = project_url;
    }

    if (status !== undefined) {
      project.status = status;
    }

    // If new image uploaded
    if (req.file) {
      project.project_image =
        `/uploads/projects/${req.file.filename}`;
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// ===============================
// DELETE PROJECT
// ===============================
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};