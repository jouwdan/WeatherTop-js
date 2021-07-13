'use strict';

const logger = require("../utils/logger");
const weatherUtil = require("../utils/weatherUtil");
const stationStore = require("../models/station-store");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);

    let fahrenheit = null;
    let weatherCodeString = null;
    let windSpeedInBft = null;
    for (let i = 0; i < stationStore.getStation(stationId).length; i++) {
      const lastReading = stationStore.getStation(stationId).readings[i][stationStore.getStation(stationId).readings[i].length - 1];
      
      weatherCodeString = weatherUtil.weatherCodeToString(lastReading.code);
      lastReading.weatherCodeString = weatherCodeString;
      
      fahrenheit = weatherUtil.cToF(lastReading.temperature);
      lastReading.tempInF = fahrenheit;
      
      windSpeedInBft = weatherUtil.windSpeedToBft(lastReading.windSpeed);
      lastReading.windSpeedInBft = windSpeedInBft;
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