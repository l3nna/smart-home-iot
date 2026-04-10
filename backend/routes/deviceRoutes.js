const express = require("express");
const router = express.Router();
const { toggleLED } = require("../controllers/deviceController");

router.post("/led", toggleLED);

module.exports = router;