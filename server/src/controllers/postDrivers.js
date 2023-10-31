const { postDriver } = require("../controllers/postDrivers");

const postDrivers = async (name, lastName, description, image, nationality, birthDate, teamName) => {
    try {
        // Llama al controlador para crear un nuevo conductor
        const createdDriver = await postDriver(name, lastName, description, image, nationality, birthDate, teamName);
        
        // Devuelve el conductor creado como respuesta
        return createdDriver;
    } catch (error) {
        
       
// Si hay un error durante el proceso, lanza el error para ser manejado en el nivel superior
        throw new Error(error.message);
    }
};

module.exports = {
    postDrivers
};