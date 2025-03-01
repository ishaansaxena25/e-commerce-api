import Admin from "../model/admin";
import bcrypt from "bcryptjs";
const Product = require("../model/Product");

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
    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProduct = async (req: any, res: any) => {
  try {
    const products = await Product.find({
      admin: req.admin._id,
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findOne({
      name: req.body.name,
    });
    if (Product) {
      return res.status(400).json({ message: "Product already exists" });
    } else {
      const { name, price, category, count } = req.body;
      const product = new Product({
        name,
        price,
        category,
        count,
        admin: req.admin._id,
      });
      await product.save();
      res.status(201).json({ message: "Product added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login, getProduct };
