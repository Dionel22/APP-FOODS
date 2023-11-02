const { diet } = require("../../db");
require('dotenv').config();
const { DB_APi_KEY } = process.env;
  
const getAllDietsDB = async () => {
    const responseDb = await diet.findAll({attributes: ["name"]});

   if(responseDb.length === 0){
   const responseApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)
   .then(data => data.json())
   .then((responseApi) =>{
    const responseDiets = responseApi.results.map((e) =>{ 
    return  e.diets?.map(diet => {
        return {name: diet}
      }) 
   })
   return responseDiets;
   })
   const transforma = responseApi.flatMap(e => e);
   console.log("api", transforma );

   transforma.forEach(e=>{
        diet.findOrCreate({where:{name: `${e.name}`}});
    });
    
    const response = await diet.findAll({attributes: ["name"]});
    return response;
}
 
 
  return responseDb;
}

  module.exports =  getAllDietsDB;