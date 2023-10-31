const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

  // defino el modelo

  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue: DataTypes.UUIDV4,
    },
    
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: 'Por favor, introduce una URL válida para la imagen.'
        }
      }
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},
{freezeTableName: true, timestamps: false,}
  
  );
};