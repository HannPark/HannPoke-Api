const mongoose = require("mongoose");

const FightsSchema = new mongoose.Schema({
  pokemon1: {
    name: String,
    type: String,
  },
  pokemon2: {
    name: String,
    type: String,
  },
  winner: String,
});

module.exports = mongoose.model("pokemon-Fights", FightsSchema);
