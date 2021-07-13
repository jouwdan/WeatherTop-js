"use strict";

const logger = require("../utils/logger");

const home = {
  index(request, response) {
    logger.info("home rendering");
    const viewData = {
      title: "Playlist 1"
    };
    response.render("home", viewData);
  }
};

module.exports = home;
