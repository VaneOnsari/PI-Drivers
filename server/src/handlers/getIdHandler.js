const {getIdControllers} = require("../controllers/getIdController");

const getIdHandler= async (req, res) => {
   try {
        const {id} = req.params;
        const driver = await getIdControllers(id);
        if (driver) {res.status(200).json(driver);
        } else {
            res.status(400).json({ error: "Conductor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

module.exports = {getIdHandler};