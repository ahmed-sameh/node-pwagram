const express = require("express");
const subController = require("../controllers/web-browser-subscriptions");

const router = express.Router();

router.post("/create", subController.createSubscription);

module.exports = router;
