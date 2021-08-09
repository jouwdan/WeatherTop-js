"use strict";

const logger = require("../utils/logger");
const weatherUtil = require("../utils/weatherUtil");
const stationStore = require("../models/station-store");
const account = require("./account");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    const loggedInUser = account.getCurrentUser(request);
    if (loggedInUser) {
      logger.info("Logged in user: " + loggedInUser.email);
      logger.info("Rendering dashboard");

      let userStations = stationStore.getUserStations(loggedInUser.id);
      let weatherCodeString, fahrenheit, windSpeedInBft, feelsLike, windDirection = null;
      for (let i = 0; i < userStations.length; i++) {
              const lastReading = userStations[i].readings[userStations[i].readings.length - 1];

              weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
              fahrenheit = weatherUtil.cToF(lastReading.temperature);
              windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
              feelsLike = weatherUtil.feelsLikeConversion(lastReading.temperature, lastReading.windSpeed);
              windDirection = weatherUtil.windDirectionToText(lastReading.windDirection);
              
              lastReading.weatherCodeString = weatherCodeString;
              lastReading.windDirectionText = windDirection;
              lastReading.tempInF = fahrenheit;
              lastReading.windSpeedInBft = windSpeedInBft;
              lastReading.feelsLike = feelsLike;
      }

      const viewData = {
        title: "WeatherTop | Dashboard",
        loggedInUser: loggedInUser,
        stations: userStations,
      };
      response.render("dashboard", viewData);
    } else {
      response.redirect("/login");
    };
  },
  addStation(request, response) {
    const loggedInUser = account.getCurrentUser(request);
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