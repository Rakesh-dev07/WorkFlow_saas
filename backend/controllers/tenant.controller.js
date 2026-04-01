import User from "../models/User.js";
import bcrypt from "bcryptjs";


// 🔹 Invite / Create User in Tenant
export const inviteUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Only admin can invite
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can invite users" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      tenantId: req.user.tenantId,
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get all users in tenant
export const getUsers = async (req, res) => {
  const users = await User.find({
    tenantId: req.user.tenantId,
  }).select("name email role");

  res.json(users);
};