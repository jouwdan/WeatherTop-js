"use strict";

const logger = require("../utils/logger");
const weatherUtil = require("../utils/weatherUtil");
const stationStore = require("../models/station-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    let fahrenheit = null;
    let weatherCodeString = null;
    let windSpeedInBft = null;
    for (let i = 0; i < stationStore.getAllStations().length; i++) {
      const lastReading = stationStore.getAllStations()[i].readings[stationStore.getAllStations()[i].readings.length - 1];
      
      weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
      lastReading.weatherCodeString = weatherCodeString;
      
      fahrenheit = weatherUtil.cToF(lastReading.temperature);
      lastReading.tempInF = fahrenheit;
      
      windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
      lastReading.windSpeedInBft = windSpeedInBft;
    }

    const viewData = {
      title: "WeatherTop | Dashboard",
      stations: stationStore.getAllStations()
    };
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
