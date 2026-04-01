import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";

// 🔹 Create Project 
export const createProject = asyncHandler(async (req, res) => {
  const { name, description, members } = req.body;

  const project = await Project.create({
    name,
    description,
    members,
    tenantId: req.user.tenantId,
  });

  res.status(201).json(project);
});


// 🔹 Get All Projects (Tenant Safe)
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    tenantId: req.user.tenantId,
  }).populate("members", "name email");

  res.json(projects);
});


// 🔹 Get Single Project
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    tenantId: req.user.tenantId,
  }).populate("members", "name email");

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});


// 🔹 Update Project
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      tenantId: req.user.tenantId,
    },
    req.body,
    { new: true }
  );

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});


// 🔹 Delete Project
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    tenantId: req.user.tenantId,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json({ message: "Project deleted" });
});