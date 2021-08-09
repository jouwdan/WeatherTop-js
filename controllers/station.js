"use strict";

const logger = require("../utils/logger");
const account = require("./account");
const weatherUtil = require("../utils/weatherUtil");
const stationStore = require("../models/station-store");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const loggedInUser = account.getCurrentUser(request);
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);

    let currentStation = stationStore.getStation(stationId);
    for (let i = 0; i < currentStation.length; i++) {
      if (currentStation.length >= 1) {
        const lastReading = stationStore.getStation(stationId).readings[stationStore.getStation(stationId)[i].readings.length - 1];

        lastReading.weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
        lastReading.tempInF = weatherUtil.cToF(lastReading.temperature);
        lastReading.windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
        lastReading.feelsLike = weatherUtil.feelsLikeConversion(lastReading.temperature, lastReading.windSpeed);
        lastReading.windDirectionText = weatherUtil.windDirectionToText(lastReading.windDirection);

        for(let j = 0; j < currentStation.readings.length; j++) {
          if (!currentStation.minTemp) {
            currentStation.minTemp = 2147483647.0;
          }
          if (stationStore.getStation(stationId).readings[j].temperature < currentStation.minTemp) {
            currentStation.temperature = reading.temperature;
          } else {
            return null;
          }
        }
      }
    }

    const viewData = {
      title: "WeatherTop | " + currentStation.name,
      station: stationStore.getStation(stationId),
      loggedInUser: loggedInUser,
    };
    response.render('station', viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;