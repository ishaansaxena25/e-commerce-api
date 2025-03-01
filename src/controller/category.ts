import Category from "../model/category";
// import Product from "../model/product";

const getCategories = async (req: any, res: any) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCategory = async (req: any, res: any) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({
      name,
    });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCategory = async (req: any, res: any) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({
      name,
    });
    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }
    await Category.findOneAndUpdate({ name }, { name });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req: any, res: any) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({
      name,
    });
    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }
    await Category.findOneAndDelete({ name });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
