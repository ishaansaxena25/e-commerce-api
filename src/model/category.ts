import { Schema, model } from "mongoose";

const category = new Schema({
  name: {
    type: String,
    required: true,
  },
  Products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Category = model("Category", category);
export default Category;
