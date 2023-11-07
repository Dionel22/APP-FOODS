require('dotenv').config();
const { Sequelize } = require('sequelize');
const modelDiet = require("./models/Diet");
const modelRecipe = require("./models/Recipe");
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

//le paso la instancia a los modelos
modelDiet(sequelize);
modelRecipe(sequelize);

//modelos
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { recipe, diet } = sequelize.models;

recipe.belongsToMany(diet, { through: 'RecipeDiet'});
diet.belongsToMany(recipe, { through: 'RecipeDiet'});

module.exports = {
    ...sequelize.models,
    conn: sequelize,
} 