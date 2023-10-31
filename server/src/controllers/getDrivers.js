const axios = require("axios");
const { Driver, Teams } = require("../db.js");

// Función para mapear los conductores y darles el formato adecuado
const mapDrivers = (drivers) => {
  return drivers.map((driver) => {
    if (driver) {
      let teams = [];
      let isFromDb = false;

      if (driver.id && typeof driver.id === "string") {
        isFromDb = true;
        if (driver.Teams && Array.isArray(driver.Teams)) {
          teams = driver.Teams.map((team) => team.name);
        }
      } else {
        if (typeof driver.teams === 'string') {
          teams = driver.teams.split(',').map((team) => team.trim());
        }
        if (typeof driver.name === 'string') {
          driver.name = { forename: driver.name, surname: driver.lastName };
        }
      }

      const name = driver.name.forename || driver.name;
      const lastName = driver.name.surname || driver.lastName;

      // Devuelve el objeto del conductor con el formato adecuado
      return {
        id: driver.id,
        name: name,
        lastName: lastName,
        description: driver.description,
        image: driver.image.url || driver.image,
        teams: teams,
        nationality: driver.nationality,
        birthDate: driver.dob || driver.birthDate,
        isFromDb: isFromDb,
      };
    } else {
      return null;
    }
  }).filter(driver => driver !== null);
};

// Función para obtener conductores de la base de datos local

const getDriversDb = async () => {
  const driversDb = await Driver.findAll({ 
    include: {
      model: Teams,
      attributes: ["name", "id"], 
      through: {
        attributes: [],
      }
    }
  });
  // Mapea los conductores antes de devolverlo
  
  return mapDrivers(driversDb);
};

// Función para obtener conductores de la API externa y filtrar por nombre si se proporciona

const getDriversApi = async (name) => {
  const driversDb = await getDriversDb();
  const { data: driversApi } = await axios.get("http://localhost:5000/drivers");
  const allDrivers = [...driversDb, ...driversApi];

    // Función para filtrar conductores por nombre

    const filterDriversByName = (name) => {
      if (name) {
        const driverFound = allDrivers.filter((driver) => {
          if (driver.name) {
            const fullName = `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
            return fullName.includes(name.toLowerCase());
          }
          return false;
        });
        if (driverFound.length > 0) {
          return mapDrivers(driverFound.slice(0, 15));
        } else {
          return { error: "No se encontraron conductores con ese nombre" };
        }
      }
      return mapDrivers(allDrivers);
    };

      // Llama a la función de filtrado y devuelve el resultado

  return filterDriversByName(name);
};

// Exporta la función para obtener conductores (puede filtrar por nombre)

module.exports = {
  getDrivers: getDriversApi
};