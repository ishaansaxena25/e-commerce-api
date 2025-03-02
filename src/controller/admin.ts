import Admin from "../model/admin";
import bcrypt from "bcryptjs";
const { createTokenForAdmin } = require("../auth/auth");

const signup = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({
      email,
    });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token: string = createTokenForAdmin(admin);
    res
      .cookie("token", token)
      .status(200)
      .json({ message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
