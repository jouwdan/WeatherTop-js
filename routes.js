"use strict";

const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require('./controllers/station.js');

router.get("/", home.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/station/:id", station.index);

router.post('/station/:id/addreading', station.addReading);
router.post('/dashboard/addstation', dashboard.addStation);

module.exports = router;
