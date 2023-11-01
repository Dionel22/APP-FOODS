const { Router } = require("express");
const routerRecipes = require("./RouterRecipe/routerRecipe");

const router = Router();

router.use("/recipe", routerRecipes);

module.exports = router;