const express = require("express");

const ruta = express.Router();

const { fightResult, saveFight } = require("../controllers/fights");

ruta.route("/")
  .get(fightResult, saveFight);

module.exports = ruta;
