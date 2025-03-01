import { Router } from "express";
const {
  login,
  register,
  placeOrder,
  orderHistory,
} = require("../controller/user");
const userRouter = Router();

// login route
userRouter.post("/login", login);
userRouter.post("/register", register);

//order routes
userRouter.get("/order", orderHistory);
userRouter.post("/order", placeOrder);

module.exports = userRouter;
