const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { docTitle: "Add Product" });
};

exports.postAddProduct = (req, res) => {
  console.log(req.body.title);
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("shop", {
    prods: products,
    docTitle: "Shop",
  });
};
