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

    let fahrenheit = null;
    let weatherCodeString = null;
    let windSpeedInBft = null;
    let feelsLike = null;
    let windDirection = null;
    for (let i = 0; i < stationStore.getStation(stationId).length; i++) {
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
      title: "WeatherTop | " + stationStore.getStation(stationId).name,
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
      pressure: request.body.pressure,
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;