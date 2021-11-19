"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const House2Schema = Schema({
  houseId: {
    type: Number,
    require: true,
  },

  house: {
    type: String,
    require: true,
  },
  rooms: {
    type: Number,
    require: true,
  },
  wc: {
    type: Number,
    require: true,
  },
  cellphone: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("House2", House2Schema);
