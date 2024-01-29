const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();
router.post("/login", authController.login);
router.post(
  "/signup",
  [
    body("name").isString().trim(),
    body("identity").isInt().isLength({ min: 4, max: 4 }),
    body("password").isLength({ min: 5 }),
  ],
  authController.signup
);

module.exports = router;
