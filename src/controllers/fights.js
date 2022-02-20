const pokemonFights = require("../models/fightsModel");
const { apiCallData, mappingDamage, damageCalc } = require("../functions/pokeFunctions");

exports.fightResult = async (req, res, next) => {
  try {
    const pokemon1 = req.query.poke1;
    const pokemon2 = req.query.poke2;
    // Calling PokeData and getting PokeTypes
    const pokeData1 = await apiCallData(pokemon1);
    const pokeData2 = await apiCallData(pokemon2);
    const typeArr1 = pokeData1.data.types.map((val) => val.type.name);
    const typeArr2 = pokeData2.data.types.map((val) => val.type.name);

    const damageArr1 = await mappingDamage(typeArr1);
    const damageArr2 = await mappingDamage(typeArr2);

    // Calculating Damage Advanges
    const adv1 = damageCalc(typeArr1, damageArr1, typeArr2);
    const adv2 = damageCalc(typeArr2, damageArr2, typeArr1);

    let winner = "";

    if (adv1.cont === adv2.cont) {
      winner = "Es un EMPATE";
    } else if (adv1.cont > adv2.cont) {
      winner = `El ganador es ${pokeData1.data.name}`;
    } else {
      winner = `El ganador es ${pokeData2.data.name}`;
    }

    const fight = {
      pokemon1: {
        name: pokeData1.data.name,
        types: typeArr1,
        damage_relations: adv1.damage_relations,
        score: adv1.cont,
      },
      pokemon2: {
        name: pokeData2.data.name,
        types: typeArr2,
        damage_relations: adv2.damage_relations,
        score: adv2.cont,
      },
      winner,
    };

    req.fight = fight;
    next();
  } catch (err) {
    res.status(503).send("Error generando simulacion de pelea");
  }
};

exports.saveFight = async (req, res) => {
  const data = req.fight;
  try {
    await pokemonFights.create(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(503).send("No se pudo almacenar el registro de la batalla: ", error);
  }
};
