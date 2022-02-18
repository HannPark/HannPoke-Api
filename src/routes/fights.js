const express = require("express");

const ruta = express.Router();

const { fightResult } = require("../controllers/fights");

ruta.route("/")
  .get(fightResult);

module.exports = ruta;
