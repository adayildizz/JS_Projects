const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

router.get("/", homeController.getIndex);

router.get("/games/:category", homeController.getHome);

router.post("/games/:category", homeController.getHome);

router.get("/game/:gameTitle", homeController.goGame);

module.exports = router;
