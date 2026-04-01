import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import generateToken from "../utils/generateToken.js";


// 🔹 Register Company + Admin User
export const registerCompany = async (req, res) => {
  try {
    const { companyName, name, email, password } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create tenant (company)
    const tenant = await Tenant.create({
      name: companyName,
    });

    // 4. Create admin user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      tenantId: tenant._id,
    });

    // 5. Link owner
    tenant.owner = user._id;
    await tenant.save();

    // 6. Generate token
    const token = generateToken(user);

    res.status(201).json({
      token,
      user,
      tenant,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = generateToken(user);

    const tenant = await Tenant.findById(user.tenantId);

    res.json({
      token,
      user,
      tenant,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Get Current User
export const getMe = async (req, res) => {
  res.json(req.user);
};