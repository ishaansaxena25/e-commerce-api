import Product from "../model/Product";

const sales = async (req: any, res: any) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.json(products);
};

const topsales = async (req: any, res: any) => {
  const products = await Product.find().sort({ sales: -1 });
  res.json(products);
};

const worstsales = async (req: any, res: any) => {
  const products = await Product.find().sort({ sales: 1 });
  res.json(products);
};
module.exports = { sales, topsales };
