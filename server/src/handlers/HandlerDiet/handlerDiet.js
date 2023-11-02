const getAllDietsDB = require("../../controllers/ControllerDiet/controllerDiet");

const allDiets = async (req, res) => {
    try {
        const response = await getAllDietsDB();
        return res.status(200).json(response)
    } catch (error) {
        console.log("error", error.message);
        return res.status(400).json({error: error.message})
    }
}


module.exports = allDiets;