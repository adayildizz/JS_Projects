const express = require("express");

const router = express.Router();
const productsController = require("../controllers/products");

module.exports.routes = router;

router.get("/", productsController.getProducts);
