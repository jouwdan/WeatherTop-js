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
      for (let i = 0; i < userStations.length; i++) {
        if (userStations[i].readings.length >= 1) {
          const lastReading = userStations[i].readings[userStations[i].readings.length - 1];
          lastReading.weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
          lastReading.tempInF = weatherUtil.cToF(lastReading.temperature);
          lastReading.windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
          lastReading.feelsLike = weatherUtil.feelsLikeConversion(lastReading.temperature, lastReading.windSpeed);
          lastReading.windDirectionText = weatherUtil.windDirectionToText(lastReading.windDirection);
        }
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