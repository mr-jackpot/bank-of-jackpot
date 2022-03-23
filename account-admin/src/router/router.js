const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/api/balance/:id", controller.getBalance)

module.exports = router;
