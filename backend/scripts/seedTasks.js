import mongoose from "mongoose";
import Task from "../models/Task.js";

await mongoose.connect("mongodb+srv://reminder-app_db_user:dbUser2025@cluster0.zcyhiua.mongodb.net/saas_app?appName=Cluster0");

const tasks = [];

for (let i = 1; i <= 20; i++) {
  tasks.push({
    title: `Task ${i}`,
    description: `This is task number ${i}`,
    projectId: "69c24dcf570754dabd5f9410", // Replace with current project ID
    tenantId: "69c24bd286ac313d5289ef96", // Replace with current tenant ID
    status: i % 2 === 0 ? "todo" : i % 2 === 1 ? "in-progress" : "done",
    priority: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low",
  });
}

await Task.insertMany(tasks);

console.log("✅ 20 tasks inserted");
process.exit();