import { Router } from "express";
const { signup, login, getProduct } = require("../controllers/adminController");

const adminRouter = Router();

//login route
adminRouter.post("/login", login);

adminRouter.post("/register", signup);

//product routes
adminRouter.get("/product", getProduct);
adminRouter.post("/product", (req, res) => {
  res.send("Admin route:add product");
});
adminRouter.put("/product", (req, res) => {
  res.send("Admin route:update product");
});
adminRouter.delete("/product", (req, res) => {
  res.send("Admin route:delete product");
});

//category routes
adminRouter.get("/category", (req, res) => {
  res.send("Admin route:list of all categories");
});
adminRouter.post("/category", (req, res) => {
  res.send("Admin route:add category");
});
adminRouter.put("/category", (req, res) => {
  res.send("Admin route:update category");
});
adminRouter.delete("/category", (req, res) => {
  res.send("Admin route:delete category");
});

//sales routes
adminRouter.get(`/sales/:category`, (req, res) => {
  res.send(`Admin route:list of all sales for category:${req.params.category}`);
});
adminRouter.get("/sales/top", (req, res) => {
  res.send("Admin route:top selling products");
});

adminRouter.get("/sales/worst", (req, res) => {
  res.send("Admin route:worst selling products");
});

module.exports = adminRouter;
