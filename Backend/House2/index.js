"use strict"

const app = require("./app");
const mongoose = require("mongoose");
const port = 4100;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/home")  .then(() => {
    console.log("Corriendo base de datos...");

    app.listen(port, () => {
      console.log(`Server Running in port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });