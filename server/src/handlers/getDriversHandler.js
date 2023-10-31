const {getDrivers} = require("../controllers/getDrivers");

const getDriversHandler = async(req, res) => {
    try {
        const drivers = await getDrivers();
        res.status(200).json(drivers);
      } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {getDriversHandler};