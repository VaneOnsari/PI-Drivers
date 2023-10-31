const {createDriver} = require("../controllers/postDrivers");

const postDriversHandler = async (req, res) => {
    const { name, lastName, description, image, nationality, birthDate, teamName } = req.body;
    try{
        const createdDriver = await postDriver(name, lastName, description, image, nationality, birthDate, teamName);
        res.status(200).json(createdDriver);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};
module.exports = {postDriversHandler};