"use strict";

const House = require("../models/house.model");

const HouseController = {
  hello: function (req, res) {
    return res.status(200).send({ message: "Hola mundo" });
  },

  //GUARDAR
  saveHouse: function (req, res) {
    const house = new House();

    var params = req.body;

    if (!params.house || !params.rooms || !params.wc || !params.cellphone)
      return res.status(500).send({ message: "Campos invalidos" });

    house.house = params.house;
    house.rooms = params.rooms;
    house.wc = params.wc;
    house.cellphone = params.cellphone;

    House.find({}, (err, houses) => {
      if (err) return res.status(500).send({ message: "Error al guardar" });

      if (houses.length == 0) {
        house.houseId = 1;
        house.save((err, HouseStored) => {
          if (err) return res.status(500).send({ message: "Error al guardar" });

          if (!HouseStored)
            return res.status(404).send({ message: "No se a podido guardar" });

          return res.status(200).send(structuring(HouseStored));
        });
      } else {
        const houseId = houses[houses.length - 1].houseId;

        house.houseId = houseId + 1;
        house.save((err, HouseStored) => {
          if (err) return res.status(500).send({ message: "Error al guardar" });

          if (!HouseStored)
            return res.status(404).send({ message: "No se a podido guardar" });

          return res.status(200).send(structuring(HouseStored));
        });
      }
    });
  },

  //ENCONTRAR por Id
  findHouseByHouseId: function (req, res) {
    const houseId = req.params.houseId;
    console.log(houseId);

    House.findOne({ houseId: houseId }, (err, houseFound) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver registro" });

      if (!houseFound)
        return res.status(404).send({ message: "No se encontro registro" });

      return res.status(200).send(houseFound);
    });
  },

  //DEVOLVER TODOS (LISTAR)
  getAll: function (req, res) {
    House.find({})
      .sort("-houseId")
      .exec((err, houses) => {
        if (err)
          return res.status(500).send({ message: "Error al devolverlas" });

        if (!houses)
          return res.status(404).send({ message: "No se encontro registros" });

        return res.status(200).send({ houses });
      });
  },

  //ACTUALIZAR por Id
  updateHouse: function (req, res) {
    var houseId = req.params.houseId;
    var update = req.body;

    House.findOneAndUpdate(
      { houseId },
      { ...update, updatedAt: Date.now() },
      { new: true },
      (err, house) => {
        if (err)
          return res.status(500).send({ message: "Error al actualizar" });

        if (!house)
          return res.status(404).send({ message: "No se encontro registro" });

        return res.status(200).send({ house });
      }
    );
  },

  //BORRAR por Id
  deleteHouse: function (req, res) {
    var houseId = req.params.houseId;

    House.findOneAndRemove({ houseId: houseId }, (err, houseDelete) => {
      if (err) return res.status(500).send({ message: "Error al eliminar" });

      if (!houseDelete)
        return res.status(404).send({ message: "No se pudo eliminar" });

      return res.status(200).send({ house: houseDelete });
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

module.exports = HouseController;
