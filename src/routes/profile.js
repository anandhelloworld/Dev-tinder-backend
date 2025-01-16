const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const User = require("../models/User");

profileRouter.get("/profile/view",userAuth, (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(400).send("Err Message: " + error.message);
    }
})

profileRouter.patch("/profile/update",userAuth, async(req, res) => {
    try {
        const { firstName, lastName, age, emailId, PhotoUrl, gender ,skills } = req.body;   
        const ALLOWED_FIELDS = ["firstName", "lastName", "age", "emailId","gender","skills"];
        const isUpdateAllowed = Object.keys(req.body).every((update) => ALLOWED_FIELDS.includes(update));
        if (!isUpdateAllowed) {
            throw new Error("Invalid Updates");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((update) => {
            loggedInUser[update] = req.body[update];
        });
        await loggedInUser.save();
    } catch (error) {
        res.status(400).send("Err Message: " + error.message);
    }
})

module.exports = profileRouter;