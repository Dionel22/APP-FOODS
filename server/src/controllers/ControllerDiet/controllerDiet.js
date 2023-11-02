const { diet } = require("../../db");
require('dotenv').config();
const { DB_APi_KEY } = process.env;

const getAllDietsDB = async () => {
  // Intenta obtener las dietas de la base de datos local
  const responseDb = await diet.findAll({ attributes: ["name"] });

  // Si no se encuentran dietas en la base de datos, realiza una llamada a la API
  if (responseDb.length === 0) {
    // Realiza una llamada a la API para obtener datos de recetas
    const responseApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)
      .then(data => data.json())
      .then(responseApi => {
        const responseDiets = responseApi.results.flatMap(e => e.diets?.map(diet => ({ name: diet })));
        return responseDiets;
      });

    // Almacena las dietas en la base de datos
    responseApi.forEach(e => {
      diet.findOrCreate({ where: { name: e.name } });
    });

    // Realiza otra consulta para obtener las dietas actualizadas
    const response = await diet.findAll({ attributes: ["name"] });
    return response;
  }

  // Si se encontraron dietas en la base de datos, simplemente devuelve esas dietas
  return responseDb;
};


module.exports =  getAllDietsDB;