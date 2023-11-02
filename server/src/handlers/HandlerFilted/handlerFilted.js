const filted = require("../../controllers/ControllerFilted/controllerFilted");

const getFilteds = async (req, res) => {
    const filteds = req.query;
    try {
        console.log(filteds)
        const response = await filted(filteds);
        return res.status(200).json(response);
    } catch (error) {
        console.log("error", error.message);
        return res.status(400).json({error: error.message});
    }
}

module.exports = getFilteds;