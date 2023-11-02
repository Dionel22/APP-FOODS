const { recipe, diet } = require("../../db");

const filted = async (filtro) => {
    if(filtro.api === "API"){
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)
    .then((data)=> data.json())
    .then(data => {
        return data.results.map(e =>{
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
            }
        })
    })
    return api;
}

    let whereClause = {};

    if (filters.title) {
        const searchQuery = `%${filters.title}%`; // No es necesario convertir a minúsculas en este caso
        whereClause.name = {
          [Op.iLike]: searchQuery,
        };
      }
    
      // Buscar libros por precio [1000, 5000]
      //console.log("filter",typeof filters.price)
      if (filters.price) {
        const priceArray = filters.price.split(',').map(Number);
        if (priceArray.length === 2) {
         // console.log("<--<>", priceArray);
          whereClause.price = {
            [Op.between]: priceArray,
          };
        }
      }
    
      // Buscar libros con fecha de Lanzamiento
      //console.log("fecha",filters.releaseDate)
      if (filters.releaseDate) {
        const [startDate, endDate] = filters.releaseDate.split(',');
      
        whereClause.releaseDate = {
          [Op.between]: [startDate.trim(), endDate.trim()],
        };
      }
    
      // Si se proporciona el nombre del autor, buscamos el ID del autor para la consulta
      if (filters.author) {
        const author = await Author.findOne({ where: { name: filters.author } });
        if (author) {
            whereClause.AuthorId = author.dataValues.id;
            //console.log("--<",whereClause)
        }
      }
    
      // Si se proporciona el género del libro, buscamos el ID del género para la consulta
      if (filters.diet) {
        const diet = await diet.findOne({ where: { name: filters.diet } });
        if (diet) {
            //console.log(gender.dataValues)
          whereClause.dietId = diet.dataValues.id;
        }
      }
    
    
      const result = await recipe.findAll({ where: whereClause, include: [diet] });
      //console.log("<--->",result)
       return result;
}

module.exports = filted;