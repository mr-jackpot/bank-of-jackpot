const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")

router.get("/api/balance/:id", controller.getBalance)

module.exports = router;
