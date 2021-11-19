"use strict";

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const HouseSchema = Schema({
  houseId: {
    type: Number,
    require: true,
  },
  house: String,
  rooms: Number,
  wc: Number,
  cellphone: Number,
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

module.exports = mongoose.model("House", HouseSchema);
