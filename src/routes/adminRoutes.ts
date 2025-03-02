import { Router } from "express";
import { checkforAdmin } from "../middleware/auth";
const { signup, login } = require("../controllers/adminController");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../controllers/categoryController");
const {
  sales,
  topsales,
  worstsales,
} = require("../controllers/salesController");

const adminRouter = Router();

//login route
adminRouter.post("/login", login);

adminRouter.post("/register", signup);

//product routes
adminRouter.get("/product", checkforAdmin, getProduct);
adminRouter.post("/product", checkforAdmin, addProduct);
adminRouter.put("/product/:id", checkforAdmin, updateProduct);
adminRouter.delete("/product", checkforAdmin, deleteProduct);

//category routes
adminRouter.get("/category", checkforAdmin, getCategories);
adminRouter.post("/category", checkforAdmin, createCategory);
adminRouter.put("/category", checkforAdmin, updateCategory);
adminRouter.delete("/category", checkforAdmin, deleteCategory);

//sales routes
adminRouter.get(`/sales/:category`, checkforAdmin, sales);
adminRouter.get("/sales/top", checkforAdmin, topsales);

adminRouter.get("/sales/worst", checkforAdmin, worstsales);

module.exports = adminRouter;
