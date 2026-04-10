const {runPython} = require("../services/pythonService");

exports.toggleLED = async(req, res) => {
    const state = req.body.state;

    console.log("LED state:", state);

    await runPython('led ${state}');

    res.json({success: true });}