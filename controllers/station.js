'use strict';

const logger = require("../utils/logger");
const weatherUtil = require("../utils/weatherUtil");
const stationStore = require("../models/station-store");
const accounts = require("./accounts");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);
    const loggedInUser = accounts.getCurrentUser(request);
    let fahrenheit = null;
    let weatherCodeString = null;
    let windSpeedInBft = null;
    let feelsLike = null;
    let windDirection = null;
    for (let i = 0; i < stationStore.getStation(stationId).length; i++) {
      if (stationStore.getStation(stationId).readings[i][stationStore.getStation(stationId).readings[i].length] >= 1) {
      const lastReading = stationStore.getStation(stationId).readings[i][stationStore.getStation(stationId).readings[i].length - 1];
      
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
      title: "WeatherTop | " + stationStore.getStation(stationId).name,
      station: stationStore.getStation(stationId),
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