"use strict";

const express = require("express");
const house2Router = express.Router();

const House2Controller = require("../controllers/house2.controller");

house2Router.get("/hola", House2Controller.hola); //PRUEBA
house2Router.post("/save-house2", House2Controller.saveHouse); //GUARDAR
house2Router.put("/update-house2/:houseId", House2Controller.updateHouse2); //ACTUALIZAR
house2Router.get("/getAlls", House2Controller.getAll); //LISTARLOS
house2Router.get("/findHouse/:houseId", House2Controller.findHouse2ByHouseId); //BUSCAR POR ID
house2Router.delete("/delete-house/:houseId", House2Controller.deleteHouse2); //BORRAR POR ID

module.exports = house2Router;
