require('dotenv').config();
const { Sequelize } = require('sequelize');
const modelDiet = require("./models/Diet");
const modelRecipe = require("./models/Recipe");
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/foods`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//le paso la instancia a los modelos
modelDiet(sequelize);
modelRecipe(sequelize);

//modelos
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe, Diet } = sequelize.models;

Recipe.belongsToMany(Diet, { through: 'RecipeDiet'});
Diet.belongsToMany(Recipe, { through: 'RecipeDiet'});

module.exports = {
    ...sequelize.models,
    conn: sequelize,
} 