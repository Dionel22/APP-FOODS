const { Router } = require("express");
const routerRecipes = require("./RouterRecipe/routerRecipe");
const routerDiets = require("./RouterDiet/routerDiet");
const routerFilteds = require("./RouterFilted/routerFilted");

const router = Router();

router.use("/recipe", routerRecipes);
router.use("/diet", routerDiets);
router.use("/filter", routerFilteds);

module.exports = router;