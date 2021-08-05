"use strict";

const logger = require("../utils/logger");
const weatherUtil = require("../utils/weatherUtil");
const stationStore = require("../models/station-store");
const accounts = require ("./accounts");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    let fahrenheit = null;
    let weatherCodeString = null;
    let windSpeedInBft = null;
    let feelsLike = null;
    let windDirection = null;
    for (let i = 0; i < stationStore.getAllStations().length; i++) {
      if (stationStore.getAllStations()[i].readings[stationStore.getAllStations()[i].readings.length] >= 1) {
      const lastReading = stationStore.getAllStations()[i].readings[stationStore.getAllStations()[i].readings.length - 1];
      
      weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
      lastReading.weatherCodeString = weatherCodeString;
      
      fahrenheit = weatherUtil.cToF(lastReading.temperature);
      lastReading.tempInF = fahrenheit;
      
      windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
      lastReading.windSpeedInBft = windSpeedInBft;

      feelsLike = weatherUtil.feelsLikeConversion(lastReading.temperature, lastReading.windSpeed);
      lastReading.feelsLike = feelsLike;

      windDirection = weatherUtil.windDirectionToText(lastReading.windDirection);
      lastReading.windDirection = windDirection;
      }
    }
    const viewData = {
      title: "WeatherTop | Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
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
