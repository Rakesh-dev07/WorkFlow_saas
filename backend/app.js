import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import taskRoutes from "./routes/task.routes.js";
import errorHandler from "./middleware/errror.middleware.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();


app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use(helmet());

// Limit requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;