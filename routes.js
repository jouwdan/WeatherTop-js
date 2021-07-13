"use strict";

const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");

router.get("/", home.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);

module.exports = router;
