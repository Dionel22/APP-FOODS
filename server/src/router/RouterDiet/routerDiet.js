const { Router } = require("express");
const allDiets = require("../../handlers/HandlerDiet/handlerDiet");

const routerDiets = Router();

routerDiets.get("/", allDiets);

module.exports = routerDiets;