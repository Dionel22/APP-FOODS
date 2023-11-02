const { Op } = require('sequelize');
const { recipe, diet } = require("../../db");

const filted = async (filters) => {
  if (filters.api === "API") {
    // Hacer la llamada a la API y transformar los datos, como lo hiciste antes
    const apiData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_API_KEY}`)
      .then((data) => data.json())
      .then((data) => {
        return data.results.map((e) => {
          // Transformar los datos de la API
          return {
            // ...
          };
        });
      });
    
    return apiData;
  }

  // Si no estás usando la API, construir la cláusula de búsqueda en la base de datos
  const whereClause = {};

  if (filters.title) {
    const searchQuery = `%${filters.title}%`;
    whereClause.title = {
      [Op.iLike]: searchQuery,
    };
  }

  if (filters.diet) {
    // Si se proporciona un filtro de dieta, buscamos las recetas que cumplen con esa dieta
    whereClause['$diets.name$'] = filters.diet;
  }

  const result = await recipe.findAll({
    where: whereClause,
    attributes: ["id", "title", "image", "summary", "healthScore", "steps"],
    include: {
      model: diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  return result;
};


module.exports = filted;