const express = require("express");

const bankController = require("../controllers/bank");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/transfer", isAuth, bankController.transfer);

router.post("/loan", isAuth, bankController.loan);

module.exports = router;
