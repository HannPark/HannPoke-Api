/* eslint-disable no-await-in-loop */
const axios = require("axios");

exports.apiCallData = async (pokeName) => {
  const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  return pokeData;
};

const apiCallType = async (type) => {
  const pokeType = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return pokeType;
};

exports.mappingDamage = async (data, array) => {
  for (let i = 0; i < data.length; i += 1) {
    const arrData = await apiCallType(data[i]);
    array.push(arrData.data.damage_relations);
  }
};

exports.damageCalc = (pokeTypes1, damageArr1, pokeTypes2) => {
  let cont = 0;
  pokeTypes1.forEach(async (val1, index1) => {
    pokeTypes2.forEach((val2) => {
      // Checking Damages
      const checkDDF = damageArr1[index1].double_damage_from.some((val) => val.name === val2);
      const checkDDT = damageArr1[index1].double_damage_to.some((val) => val.name === val2);
      const checkHDF = damageArr1[index1].half_damage_from.some((val) => val.name === val2);
      const checkHDT = damageArr1[index1].half_damage_to.some((val) => val.name === val2);

      if (checkDDF) {
        cont -= 70;
      }
      if (checkDDT) {
        cont += 70;
      }
      if (checkHDF) {
        cont -= 30;
      }
      if (checkHDT) {
        cont += 30;
      }
    });
  });
  return cont;
};
