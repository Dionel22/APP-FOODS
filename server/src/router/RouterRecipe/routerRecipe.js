const { Router } = require("express");
const { getAllRecipe, postRecipe } = require("../../handlers/HandlerRecipe/handlerRecipe");

const routerRecipes = Router();

routerRecipes.get("/", getAllRecipe);
routerRecipes.post("/", postRecipe);

module.exports = routerRecipes;