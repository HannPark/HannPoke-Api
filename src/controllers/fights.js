const axios = require("axios");
const pokemonFights = require("../models/fightsModel");

const apiCallData = async (pokeName) => {
  console.log("APICALLDATA");
  const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  return pokeData;
};

const apiCallType = async (type) => {
  console.log("APICALLTYPE");
  const pokeType = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return pokeType;
};

exports.fightResult = async (req, res, next) =>{
  try {
    const pokemon1 = req.query.poke1;
    const pokemon2 = req.query.poke2;
    const pokeData1 = await apiCallData(pokemon1);
    const pokeData2 = await apiCallData(pokemon2);
    const typeArr1 = pokeData1.data.types.map((val) => val.type.name);
    const typeArr2 = pokeData2.data.types.map((val) => val.type.name);
    console.log("tipos 1: ", typeArr1);
    console.log("tipos 2: ", typeArr2);
    // const pokeType1 = await apiCallType("fighting");
    // const pokeData2 = apiCallData(pokemon2).then((val) => console.log(val));
    res.status(200).json(pokeData1.data);
  } catch (err) {
    res.status(503).send("Error generando simulacion de pelea");
  }
};
