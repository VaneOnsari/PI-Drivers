const axios = require("axios");
const { Driver, Teams } = require("../db");

const getIdControllers = async (id) => {
  let driver;
  if (isNaN(id)) {
    driver = await Driver.findByPk(id, { Include: Teams });
    if (!driver) {
      throw new Error("Driver not found in the DataBase");
    }
  } else {
    try {
      const response = await axios.get(`http://localhost:5000/drivers/${id}`);
      driver = response.data;
    } catch (error) {
      throw new Error("Driver not found in the Api");
    }
  }
  return driver;
};

module.exports = getIdControllers;