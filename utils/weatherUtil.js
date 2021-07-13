"use strict";

const weatherUtil = {
  cToF(cInput) {
    let fahrenheit = null;
    fahrenheit = (9/5) * cInput + 32;
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
  }
};

module.exports = weatherUtil;