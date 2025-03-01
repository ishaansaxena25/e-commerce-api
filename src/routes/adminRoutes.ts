import { Router } from "express";
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
adminRouter.get("/product", getProduct);
adminRouter.post("/product", addProduct);
adminRouter.put("/product/:id", updateProduct);
adminRouter.delete("/product", deleteProduct);

//category routes
adminRouter.get("/category", getCategories);
adminRouter.post("/category", createCategory);
adminRouter.put("/category", updateCategory);
adminRouter.delete("/category", deleteCategory);

//sales routes
adminRouter.get(`/sales/:category`, sales);
adminRouter.get("/sales/top", topsales);

adminRouter.get("/sales/worst", worstsales);

module.exports = adminRouter;
