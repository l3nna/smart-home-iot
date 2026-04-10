const express = requre("express");
const router = express.Router();
const { toggleLED } = require("../controllers/deviceControlller");

router.post("/led", toggleLED);

module.exports = router;