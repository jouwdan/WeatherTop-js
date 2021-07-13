"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const stationCollection = require("./station-store.json").stationCollection;

const stationStore = {
  store: new JsonStore("./station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  removeStation(id) {
    const station = this.Station(id);
    this.store.remove(this.collection, station);
    this.store.save();
  }
};

module.exports = stationCollection;
