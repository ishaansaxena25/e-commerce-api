import User from "../model/user";
import bcrypt from "bcryptjs";
import Product from "../model/Product";
import OrderHistory from "../model/orderHistory";
const { createTokenForUser } = require("../auth/auth");
const register = async (req: any, res: any) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      res.status(200).json({
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "invalid password",
      });
    }
    const token = createTokenForUser(user);
    res.cookie("token", token).status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const placeOrder = async (req: any, res: any) => {
  if (!req.user.id) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({
      message: "Product not found",
    });
  }
  if (product.count == 0) {
    return res.status(400).json({
      message: "Product out of stock",
    });
  }
  const order = new OrderHistory({
    user: userId,
    orderItems: [
      {
        product: product._id,
        quantity,
      },
    ],
  });
  await order.save();
  product.count -= quantity;
  product.sales += quantity;
  await product.save();
  res.status(200).json({
    message: "Order placed successfully",
  });
};

const orderHistory = async (req: any, res: any) => {
  if (!req.user.id) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const userId = req.user.id;
  const orders = await OrderHistory.find({ user: userId }).populate("product");
  res.status(200).json({
    orders,
  });
};

export = { register, login, placeOrder, orderHistory };
