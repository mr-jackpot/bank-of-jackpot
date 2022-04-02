const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")

var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/api/payments/status", controller.serverStatus)
router.get("/api/payments", controller.getAllPayments)

router.post("/api/payments", urlencodedParser, controller.makePayment)

module.exports = router;
