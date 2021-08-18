"use strict";

const stationStore = require("../models/station-store");

const weatherUtil = {

    cToF(cInput) {
        let fahrenheit = null;
        fahrenheit = (9 / 5) * cInput + 32;
        return fahrenheit;
    },

    weatherCodeToString(weatherCode) {
        let weatherCodeString = null;
        if (weatherCode == 100) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-sun'></i></span><br>Clear";
        } else if (weatherCode == 200) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-cloud-sun'></i></span>Partial Clouds";
        } else if (weatherCode == 300) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-cloud'></i></span>Cloudy";
        } else if (weatherCode == 400) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-cloud-sun-rain'></i></span>Light Showers";
        } else if (weatherCode == 500) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-cloud-showers-heavy'></i></span>Heavy Showers";
        } else if (weatherCode == 600) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-cloud-rain'></i></span>Rain";
        } else if (weatherCode == 700) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-snowflake'></i></span>Snow";
        } else if (weatherCode == 800) {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-bolt'></i></span>Thunder";
        } else {
            weatherCodeString = "<span class='icon is-large'><i class='fas fa-2x fa-poo-storm'></i></span>Unknown";
        }
        return weatherCodeString;
    },

    windSpeedToBft(windSpeed) {
        let windSpeedToBft = null;
        if (windSpeed <= 1) {
            windSpeedToBft = "0 bft";
        } else if (windSpeed > 1 && windSpeed <= 5) {
            windSpeedToBft = "1 bft";
        } else if (windSpeed > 5 && windSpeed <= 11) {
            windSpeedToBft = "2 bft";
        } else if (windSpeed > 11 && windSpeed <= 19) {
            windSpeedToBft = "3 bft";
        } else if (windSpeed > 19 && windSpeed <= 28) {
            windSpeedToBft = "4 bft";
        } else if (windSpeed > 28 && windSpeed <= 28) {
            windSpeedToBft = "5 bft";
        } else if (windSpeed > 38 && windSpeed <= 49) {
            windSpeedToBft = "6 bft";
        } else if (windSpeed > 49 && windSpeed <= 61) {
            windSpeedToBft = "7 bft";
        } else if (windSpeed > 61 && windSpeed <= 74) {
            windSpeedToBft = "8 bft";
        } else if (windSpeed > 74 && windSpeed <= 88) {
            windSpeedToBft = "9 bft";
        } else if (windSpeed > 88 && windSpeed <= 102) {
            windSpeedToBft = "10 bft";
        } else if (windSpeed > 102 && windSpeed <= 117) {
            windSpeedToBft = "11 bft";
        } else {
            windSpeedToBft = "Unknown";
        }
        return windSpeedToBft;
    },

    feelsLikeConversion(temperature, windSpeed) {
        let feelsLikeTemp = null;
        feelsLikeTemp = Math.round((13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) +
            0.3965 * temperature * Math.pow(windSpeed, 0.16)) * 10.0) / 10.0;
        return feelsLikeTemp;
    },

    windDirectionToText(windDirection) {
        let windDirectionToText = null;
        if ((windDirection >= 348.75) && (windDirection <= 360) ||
            (windDirection >= 0) && (windDirection < 11.25)) {
            windDirectionToText = "North";
        } else if ((windDirection >= 11.25) && (windDirection < 33.75)) {
            windDirectionToText = "North North East";
        } else if ((windDirection >= 33.75) && (windDirection < 56.25)) {
            windDirectionToText = "North East";
        } else if ((windDirection >= 56.25) && (windDirection < 78.75)) {
            windDirectionToText = "East North East";
        } else if ((windDirection >= 78.75) && (windDirection < 101.25)) {
            windDirectionToText = "East";
        } else if ((windDirection >= 101.25) && (windDirection < 123.75)) {
            windDirectionToText = "East South East";
        } else if ((windDirection >= 123.75) && (windDirection < 146.25)) {
            windDirectionToText = "South East";
        } else if ((windDirection >= 146.25) && (windDirection < 168.75)) {
            windDirectionToText = "South South East";
        } else if ((windDirection >= 168.75) && (windDirection < 191.25)) {
            windDirectionToText = "South";
        } else if ((windDirection >= 191.25) && (windDirection < 213.75)) {
            windDirectionToText = "South South West";
        } else if ((windDirection >= 213.75) && (windDirection < 236.25)) {
            windDirectionToText = "South West";
        } else if ((windDirection >= 236.25) && (windDirection < 258.75)) {
            windDirectionToText = "West South West";
        } else if ((windDirection >= 258.75) && (windDirection < 281.25)) {
            windDirectionToText = "West";
        } else if ((windDirection >= 281.25) && (windDirection < 303.75)) {
            windDirectionToText = "West North West";
        } else if ((windDirection >= 303.75) && (windDirection < 326.25)) {
            windDirectionToText = "North West";
        } else if ((windDirection >= 326.25) && (windDirection < 348.75)) {
            windDirectionToText = "North North West";
        } else {
            windDirectionToText = "Unknown";
        }
        return windDirectionToText;
    },

    minTemp(stationArray) {
        return stationArray.readings.sort(function(a, b) {
            return parseFloat(a['temperature']) - parseFloat(b['temperature']);
        });
    },

    maxTemp(stationArray) {
        return stationArray.readings.sort(function(a, b) {
            return parseFloat(b['temperature']) - parseFloat(a['temperature']);
        });
    },

    minWindSpeed(stationArray) {
        return stationArray.readings.sort(function(a, b) {
            return parseFloat(a['windSpeed']) - parseFloat(b['windSpeed']);
        });
    },

    maxWindSpeed(stationArray) {
        return stationArray.readings.sort(function(a, b) {
            return parseFloat(b['windSpeed']) - parseFloat(a['windSpeed']);
        });
    },

    minPressure(stationArray) {
        return stationArray.readings.sort(function(a, b) {
            return parseFloat(a['pressure']) - parseFloat(b['pressure']);
        });
    },

    maxPressure(stationArray) {
        return stationArray.readings.sort(function(a, b) {
            return parseFloat(b['pressure']) - parseFloat(a['pressure']);
        });
    },

    weatherTrend(values) {
        let trend = null;
        if ((values[0] > values[1]) && (values[1] > values[2])) {
            trend = "<span class='icon is-medium text-right text-success'><i class='fas fa-2x fa-arrow-up'></i></span>";
        } else if ((values[0] < values[1]) && (values[1] < values[2])) {
            trend = "<span class='icon is-medium text-right text-error'><i class='fas fa-2x fa-arrow-down'></i></span>";
        } else {
            trend = "<span class='icon is-medium text-right text-primary'><i class='fas fa-2x fa-equals'></i></span>";
        }
        return trend;
    },
};

module.exports = weatherUtil;