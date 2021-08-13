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

    const currentStation = stationStore.getStation(stationId);
    const lastReading = currentStation.readings[currentStation.readings.length - 1];

    if (currentStation.readings.length >= 1) {
      lastReading.weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
      lastReading.tempInF = weatherUtil.cToF(lastReading.temperature);
      lastReading.windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
      lastReading.feelsLike = weatherUtil.feelsLikeConversion(lastReading.temperature, lastReading.windSpeed);
      lastReading.windDirectionText = weatherUtil.windDirectionToText(lastReading.windDirection);

      let minTempSortedArray = currentStation.readings.sort(function(a, b) {
          return parseFloat(a['temperature']) - parseFloat(b['temperature']);
      });
      currentStation.minTemp = weatherUtil.minTemp(currentStation)[0]['temperature'];
      currentStation.maxTemp = weatherUtil.maxTemp(currentStation)[0]['temperature'];
      currentStation.minWindSpeed = weatherUtil.minWindSpeed(currentStation)[0]['windSpeed'];
      currentStation.maxWindSpeed = weatherUtil.maxWindSpeed(currentStation)[0]['windSpeed'];
      currentStation.minPressure = weatherUtil.minPressure(currentStation)[0]['pressure'];
      currentStation.maxPressure = weatherUtil.maxPressure(currentStation)[0]['pressure'];
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