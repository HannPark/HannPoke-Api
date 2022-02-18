/* eslint-disable no-await-in-loop */
const axios = require("axios");
// const pokemonFights = require("../models/fightsModel");

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

const mappingDamage = async (data, array) => {
  for (let i = 0; i < data.length; i += 1) {
    const arrData = await apiCallType(data[i]);
    array.push(arrData.data.damage_relations);
  }
};

exports.fightResult = async (req, res, next) => {
  try {
    const pokemon1 = req.query.poke1;
    const pokemon2 = req.query.poke2;
    // Calling PokeData and getting PokeTypes
    const pokeData1 = await apiCallData(pokemon1);
    const pokeData2 = await apiCallData(pokemon2);
    const typeArr1 = pokeData1.data.types.map((val) => val.type.name);
    const typeArr2 = pokeData2.data.types.map((val) => val.type.name);

    const damageArr1 = [];
    const damageArr2 = [];
    await mappingDamage(typeArr1, damageArr1);
    await mappingDamage(typeArr2, damageArr2);

    console.log("DAMAGE1: ", damageArr1);
    console.log("DAMAGE2: ", damageArr2);
    console.log("tipos 1: ", typeArr1);
    console.log("tipos 2: ", typeArr2);

    // let contador1 = 0;
    // let contador2 = 0;
    typeArr1.forEach((val1, index1) => {
      typeArr2.forEach((val2) => {
        console.log(`Se compara tipo ${val1} con tipo ${val2}`);
        const check = damageArr1[index1].double_damage_from.some((val) => val.name === val2);
        console.log("CHECK: ", check);
        if (check) {
          console.log("Hay Doble Damage FROM");
        }
      });
    });

    res.status(200).json({ poke1: damageArr1, poke2: damageArr2 });
  } catch (err) {
    res.status(503).send("Error generando simulacion de pelea");
  }
};
