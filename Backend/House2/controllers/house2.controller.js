"use strict";

const { response } = require("express");
const House2 = require("../models/house2.model");

const House2Controller = {
  hola: function (req, res) {
    return res.status(200).send({ message: "Hola mundo" });
  },

  //GUARDAR CASA
  saveHouse: function (req, res) {
    const house2 = new House2();

    const params = req.body;

    if (!params.house || !params.rooms || !params.wc || !params.cellphone)
      return res.status(500).send({ message: "Campos invalidos" });

    house2.house = params.house;
    house2.rooms = params.rooms;
    house2.wc = params.wc;
    house2.cellphone = params.cellphone;

    House2.find({}, (err, houses2) => {
      if (err) return res.status(500).send({ message: "Error al guardar" });

      if (houses2.length == 0) {
        house2.houseId = 1;
        house2.save((err, House2Stored) => {
          if (err) return res.status(500).send({ message: "Error al guardar" });

          if (!House2Stored)
            return res.status(404).send({ message: "No se a podido guardar" });

          return res.status(200).send(structuring(House2Stored));
        });
      } else {
        const houseId = houses2[houses2.length - 1].houseId;

        house2.houseId = houseId + 1;
        house2.save((err, House2Stored) => {
          if (err) return res.status(500).send({ message: "Error al guardar" });

          if (!House2Stored)
            return res.status(404).send({ message: "No se a podido guardar" });

          return res.status(200).send(structuring(House2Stored));
        });
      }
    });
  },

  //ACTUALIZAR POR ID
  updateHouse2: function (req, res) {
    const houseId = req.params.houseId;
    const update = req.body;

    House2.findOneAndUpdate(
      { houseId },
      { ...update, updatedAt: Date.now() },
      { new: true },
      (err, house2) => {
        if (err)
          return res.status(500).send({ message: "Error al actualizar" });

        if (!house2) return res.status(404).send({ message: "No se encontro" });

        return res.status(200).send({ house2 });
      }
    );
  },

  //LISTAR
  getAll: function (req, res) {
    House2.find({})
      .sort("-houseId")
      .exec((err, houses2) => {
        if (err) return res.status(500).send({ message: "Error al encontrar" });

        if (!houses2)
          return res.status(404).send({ message: "No se encontro registros" });

        return res.status(200).send({ houses2 });
      });
  },

  //BUSCAR POR ID
  findHouse2ByHouseId: function (req, res) {
    var houseId = req.params.houseId;

    House2.findOne({ houseId: houseId }, (err, house2Found) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver registro" });

      if (!house2Found)
        return res.status(404).send({ message: "No se encontro registro" });

      return res.status(200).send(house2Found);
    });
  },

  //BORRAR POR ID
  deleteHouse2: function (req, res) {
    var houseId = req.params.houseId;

    House2.findOneAndRemove({ houseId: houseId }, (err, house2Delete) => {
      if (err) return res.status(500).send({ message: "Error al borrar" });

      if (!house2Delete)
        return res.status(404).send({ message: "No se encontro" });

      return res.status(200).send({ house2Delete });
    });
  },
};

function structuring(house) {
  return {
    _id: house._id,
    houseId: house.houseId,
    house: house.house,
    rooms: house.rooms,
    wc: house.wc,
    cellphone: house.cellphone,
    createdAt: house.createdAt,
    updatedAt: house.updatedAt,
  };
}

module.exports = House2Controller;
