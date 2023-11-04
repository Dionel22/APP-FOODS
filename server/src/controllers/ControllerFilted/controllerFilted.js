require('dotenv').config();
const { DB_APi_KEY } = process.env;
const { Op } = require('sequelize');
const { recipe, diet } = require("../../db");

const filted = async (filters) => {
  if (filters.api === "API") {
    console.log("api", filters);
    // Hacer la llamada a la API y transformar los datos, como lo hiciste antes
    const apiData = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)
      .then((data) => data.json())
      .then((data) => {
        return data.results.map((e) => {
          // Transformar los datos de la API
          return {
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary.replace(/<[^>]*>/g, ""),
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0]?.steps.map((el)=>{
                return{
                    number: el.number,
                    step: el.step
                }
            }),
            diets: e.diets.map(e=>{
                return{name: e}
            }),
          };
        });
      });

      let response;
      if(filters.title != null){
        //console.log("entra 1");
         response = await apiData.filter((e)=> e.title.includes(filters.title));
      }
      if(filters.diet != null){
        //console.log("entra 2");
         response = await apiData.filter((e)=> e.diets?.some(diet => diet.name === filters.diet));
      }
      //console.log("res", response);
      if(filters.title != null || filters.diet != null){
        return response;
      }
    
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