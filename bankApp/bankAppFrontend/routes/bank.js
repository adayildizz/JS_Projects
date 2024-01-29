const express = require("express");

const bankController = require("../controllers/bank");

const router = express.Router();

router.post("/tranfer", bankController.postTransfer);

router.post("/loan", appController.postLoan);

module.exports = router;
