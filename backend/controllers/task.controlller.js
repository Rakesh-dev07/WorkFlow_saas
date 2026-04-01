import Task from "../models/Task.js";
import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";

// 🔹 Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, projectId, assignedTo, priority } = req.body;

  // Check project belongs to tenant
  const project = await Project.findOne({
    _id: projectId,
    tenantId: req.user.tenantId,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const task = await Task.create({
    title,
    description,
    projectId,
    assignedTo,
    assignedBy: req.user._id,
    priority,
    tenantId: req.user.tenantId,
  });

  res.status(201).json(task);
});

// 🔹 Get Tasks (with pagination + filters)
export const getTasks = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);

  const { status, priority, projectId } = req.query;

  const filter = {
    tenantId: req.user.tenantId,
  };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (projectId) filter.projectId = projectId;

  const total = await Task.countDocuments(filter);

  const tasks = await Task.find(filter)
    .populate("projectId", "name")
    .populate("assignedTo", "name email")
    .populate("assignedBy", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    count: tasks.length,
    data: tasks,
  });
});

// 🔹 Get My Tasks
export const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    tenantId: req.user.tenantId,
    assignedTo: req.user._id,
  })
  .populate("projectId", "name")
    .populate("assignedTo", "name email")
    .populate("assignedBy", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: tasks,
  });
});

// 🔹 Update Task
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    tenantId: req.user.tenantId,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const userId = req.user._id || req.user.id;

  const isAdminOrManager =
    req.user.role === "admin" || req.user.role === "manager";

  const isAssignedUser =
    task.assignedTo &&
    task.assignedTo.toString() === userId.toString();

  if (!isAdminOrManager && !isAssignedUser) {
    res.status(403);
    throw new Error("Not authorized to update this task");
  }

  // Only allow status update
  task.status = req.body.status || task.status;

  await task.save();

  res.json(task);
});

// 🔹 Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    tenantId: req.user.tenantId,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json({ message: "Task deleted" });
});

// 🔹 Get Task Stats
export const getTaskStats = async (req, res) => {
  const tenantId = req.user.tenantId;

  const stats = await Task.aggregate([
    { $match: { tenantId } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(stats);
};
