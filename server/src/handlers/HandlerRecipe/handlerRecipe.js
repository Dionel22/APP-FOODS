const { allRecipe, addRecipe } = require("../../controllers/ControllerRecipe/controllerRecipe");
const {recipe} = require("../../db");

const getAllRecipe = async (req, res) => {
    try {
        const response = await allRecipe();
        return res.status(200).json(response);
    } catch (error) {
        console.log("error", error.message);
        return res.status(400).json({error: error.message});
    }
}

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
    postRecipe
}