const { Router } = require("express");

const routerRecipes = Router();

routerRecipes.get("/", ()=>{console.log("recipe")}),

module.exports = routerRecipes;