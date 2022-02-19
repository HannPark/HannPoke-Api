const mongoose = require("mongoose");

const FightsSchema = new mongoose.Schema({
  pokemon1: {
    name: String,
    types: [{ type: String }],
    damage_relations: [{ type: String }],
    score: Number,
  },
  pokemon2: {
    name: String,
    types: [{ type: String }],
    damage_relations: [{ type: String }],
    score: Number,
  },
  winner: String,
});

module.exports = mongoose.model("pokemon-Fights", FightsSchema);
