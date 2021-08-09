"use strict";

const logger = require("../utils/logger");
const account = require("./account");

const home = {
  index(request, response) {
    logger.info("home rendering");
    const loggedInUser = account.getCurrentUser(request);
    const viewData = {
      title: "WeatherTop | Home",
      loggedInUser: loggedInUser,
    };
    response.render("home", viewData);
  }
};

module.exports = home;
