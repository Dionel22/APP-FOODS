const { Router } = require("express");

const routerDiets = Router();

routerDiets.get("/", ()=>{console.log("diet");})

module.exports = routerDiets;