"use strict";

const logger = require("../utils/logger");
const weatherUtil = require("../utils/weatherUtil");
const stationCollection = require("../models/station-store.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    let fahrenheit = null;
    let weatherCodeString = null;
    let windSpeedInBft = null;
    for (let i = 0; i < stationCollection.length; i++) {
      const lastReading = stationCollection[i].readings[stationCollection[i].readings.length - 1];
      
      weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
      lastReading.weatherCodeString = weatherCodeString;
      
      fahrenheit = weatherUtil.cToF(lastReading.temperature);
      lastReading.tempInF = fahrenheit;
      
      windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
      lastReading.windSpeedInBft = windSpeedInBft;
    }

    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationCollection
    };
    
    //logger.info("about to render", stationCollection);
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
