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
  const damArr = [];

  pokeTypes1.forEach((val1, index1) => {
    pokeTypes2.forEach((val2) => {
      // Checking Damages
      const checkDDF = damageArr1[index1].double_damage_from.some((val) => val.name === val2);
      const checkDDT = damageArr1[index1].double_damage_to.some((val) => val.name === val2);
      const checkHDF = damageArr1[index1].half_damage_from.some((val) => val.name === val2);
      const checkHDT = damageArr1[index1].half_damage_to.some((val) => val.name === val2);
      const checkNDF = damageArr1[index1].no_damage_from.some((val) => val.name === val2);
      const checkNDT = damageArr1[index1].no_damage_to.some((val) => val.name === val2);

      if (checkDDF) {
        cont -= 70;
        damArr.push(`-70 PTS Double Damage from ${val2}`);
      }
      if (checkDDT) {
        cont += 70;
        damArr.push(`+70 PTS Double Damage To ${val2}`);
      }
      if (checkHDF) {
        cont -= 30;
        damArr.push(`-30 PTS Half Damage from ${val2}`);
      }
      if (checkHDT) {
        cont += 30;
        damArr.push(`+30 PTS Half Damage to ${val2}`);
      }
      if (checkNDF) {
        cont += 0;
        damArr.push(`0 PTS No Damage from ${val2}`);
      }
      if (checkNDT) {
        cont += 0;
        damArr.push(`0 PTS No Damage to ${val2}`);
      }
    });
  });

  const result = {
    cont,
    damage_relations: damArr,
  };

  return result;
};
