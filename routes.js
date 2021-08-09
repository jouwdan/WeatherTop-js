"use strict";

const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const account = require("./controllers/account.js");
const station = require('./controllers/station.js');

router.get("/", home.index);
router.get("/about", about.index);
router.get("/dashboard", dashboard.index);
router.get("/station/:id", station.index);
router.get("/login", account.login);
router.get("/logout", account.logout);
router.get("/register", account.register);

router.post('/station/:id/addreading', station.addReading);
router.post('/dashboard/addstation', dashboard.addStation);
router.post("/registration", account.registration);
router.post("/authentication", account.authentication);

module.exports = router;
