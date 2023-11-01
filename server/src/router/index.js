const { Router } = require("express");
const routerRecipes = require("./RouterRecipe/routerRecipe");
const routerDiets = require("./RouterDiet/routerDiet");

const router = Router();

router.use("/recipe", routerRecipes);
router.use("/diet", routerDiets);

module.exports = router;