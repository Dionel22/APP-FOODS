const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function modelRecipe (sequelize) {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    }
  });
};