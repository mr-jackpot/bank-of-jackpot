const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")

var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/api/accounts", controller.getAllAccounts)
router.get("/api/accounts/:id", controller.getOneAccount)

router.post("/api/accounts", urlencodedParser, controller.createNewAccount)

module.exports = router;
