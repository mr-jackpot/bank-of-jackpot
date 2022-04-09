const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/api/payments/status", controller.serverStatus)
router.get("/api/payments", controller.getAllPayments)
router.get("/api/payments/:id", controller.getPaymentsForCustomer)

router.post("/api/payments", jsonParser, controller.makePayment)

module.exports = router;
