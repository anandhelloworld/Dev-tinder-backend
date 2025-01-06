const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");

profileRouter.get("/user",userAuth, (req, res) => {
    try {
        res.send("req.user");
    } catch (error) {
        res.status(400).send("Err Message: " + error.message);
    }
})

module.exports = profileRouter;