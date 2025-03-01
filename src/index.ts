import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("db connection error:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
