"use strict";

const logger = require("../utils/logger");

const home = {
  index(request, response) {
    logger.info("home rendering");
    const viewData = {
      title: "WeatherTop | Home"
    };
    response.render("home", viewData);
  }
};

module.exports = home;
