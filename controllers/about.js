"use strict";

const logger = require("../utils/logger");
const account = require("./account");

const about = {
  index(request, response) {
    logger.info("about rendering");
    const loggedInUser = account.getCurrentUser(request);
    const viewData = {
      title: "WeatherTop | About",
      loggedInUser: loggedInUser,
    };
    response.render("about", viewData);
  }
};

module.exports = about;
