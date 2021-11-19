"use strict";

const express = require("express");
const houseRouter = express.Router();

const HouseController = require("../controllers/house.controller");

houseRouter.get("/hello", HouseController.hello); //PRUEBA
houseRouter.post("/save-house", HouseController.saveHouse); //GUARDAR
houseRouter.get("/getById/:houseId", HouseController.findHouseByHouseId); //ENCONTRAR POR ID
houseRouter.put("/update-house/:houseId", HouseController.updateHouse); //ACTUALIZAR POR ID JUNTO CON LA FECHA
houseRouter.delete("/delete-house/:houseId", HouseController.deleteHouse); //BORRAR POR ID
houseRouter.get("/get-houses", HouseController.getAll); //DEVOLVER TODO EL LISTADO DE REGISTROS

module.exports = houseRouter;
