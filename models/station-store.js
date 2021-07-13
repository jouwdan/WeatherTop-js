"use strict";

const stationStore = {
  stationCollection: require('./station-store.json').stationCollection,

  getStation(id) {
    let foundStation = null;
    for (let station of this.stationCollection) {
      if (id == station.id) {
        foundStation = station;
      }
    }
    return foundStation;
  },

  getAllStations() {
    return this.stationCollection;
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  },

  addStation(station) {
    this.stationCollection.push(station);
  },
};

module.exports = stationStore;