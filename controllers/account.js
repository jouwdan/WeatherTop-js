"use strict";

const userStore = require('../models/user-store');
const logger = require('../utils/logger.js');
const uuid = require('uuid');

const account = {
  login(request, response) {
    const loggedInUser = account.getCurrentUser(request);
    const viewData = {
      title: 'WeatherTop | Login',
      loggedInUser: loggedInUser,
    };
    response.render('login', viewData);
  },
  logout(request,response) {
    response.cookie('user', '');
    response.redirect('/');
  },
  register(request, response) {
    const loggedInUser = account.getCurrentUser(request);
    const viewData = {
      title: 'WeatherTop | Register',
      loggedInUser: loggedInUser,
    }
    response.render('register', viewData);
  },
  registration(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userStore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },
  authentication(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    const password = userStore.getUserByPassword(request.body.password);
    if (user&&password) {
      response.cookie("user", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },
  getCurrentUser(request, response) {
    const userEmail = request.cookies.user;
    if (userEmail) {
      return userStore.getUserByEmail(userEmail);
    } else {
      return null;
    }
  },
};

module.exports = account;

