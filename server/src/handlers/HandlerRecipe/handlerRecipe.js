const { allRecipe, addRecipe, idRecipes } = require("../../controllers/ControllerRecipe/controllerRecipe");
const {recipe} = require("../../db");

//trae todas la receta
const getAllRecipe = async (req, res) => {
    try {
        const response = await allRecipe();
        return res.status(200).json(response);
    } catch (error) {
        console.log("error", error.message);
        return res.status(400).json({error: error.message});
    }
}

//busca por ID
const getByIdRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await idRecipes(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log("error", error.message);
        return res.status(400).json({error: error.message});
    }
}

//crea la receta
const postRecipe = async (req, res) => {
    const {   
      title,
      image,
      summary,
      healthScore,
      steps, 
      diets
    } = req.body;
    try {
        const response = await addRecipe(title, image, summary, healthScore, steps, diets);
        return res.status(200).json(response);
    } catch (error) {
        console.log("error", error.message);
        return res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllRecipe,
    getByIdRecipe,
    postRecipe
}