const Product = require("../models/product");
const Category = require("../models/category");

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
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    } else {
      const { name, price, category, count } = req.body;
      const isCategory = await Category.findOne({ name: category });
      if (!isCategory) {
        return res.status(400).json({ message: "Category does not exist" });
      }
      const product = new Product({
        name,
        price,
        category,
        count,
        owner: req.admin._id,
      });
      await product.save();
      res.status(201).json({ message: "Product added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product does not exist" });
    } else {
      const { name, price, category, count } = req.body;
      await Product.updateOne(
        { name: req.body.name },
        { name, price, category, count }
      );
      res.status(200).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product does not exist" });
    }
    await Product.deleteOne({ productId: req.params.id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProduct, addProduct, updateProduct, deleteProduct };
