const { Router } = require("express");
const getFilteds = require("../../handlers/HandlerFilted/handlerFilted");

const routerFilteds = Router();

routerFilteds.get("/", getFilteds);

module.exports = routerFilteds;