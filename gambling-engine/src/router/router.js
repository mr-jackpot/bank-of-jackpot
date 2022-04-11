const express = require("express");
const router = express.Router();
const controller = require("../controller/controller")

var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/api/gambling/status", controller.serverStatus)
router.get("/api/gambling/roulette", jsonParser, controller.playRoulette)
router.get("/api/gambling/roulette/history", jsonParser, controller.gameHistory)


module.exports = router;
