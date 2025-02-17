const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const { validateSignupData } = require('../utils/validation.js')
const authRouter = express.Router()


authRouter.post('/signup', async (req, res) => {
    // Create a new instance of the User model and pass the request body to it
    const { emailId, password } = req.body
    try {
        //validation of data
        validateSignupData(req);
        //Encript the password
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)
        const user = new User({
            emailId: emailId,
            password: passwordHash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            skills:req.body.skills
            
        })
        await user.save() // Save the user to the database
        res.send({
            data: user,
            message: "User created successfully"
        }) // Send the user data back to the client
    } catch (error) {
        res.status(400).send("Err Message: " + error.message)
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        console.log("login")
        const { emailId, password } = req.body
        console.log("email:",emailId,req.body)
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials -emailId")
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new Error("Invalid Credentials - password")
        } else {
            //create a jwt web tokken

            const token = jwt.sign({ userId: user._id,role:"user" }, 'secretKey',{expiresIn:"1d"});
            console.log(token)

            //add tokken in cookie
            res.cookie("tokken", token)
            res.send({
                data: user,
                message: "User logged in successfully"
            }) // Send the user data back to the client
        }
    } catch (error) {
        res.status(400).send("Err Message: " + error.message)
    }
})

authRouter.post('/logout', async (req, res) => {
    // res.clearCookie("tokken")   - to check the cookie is deleted or not
    res.cookie("tokken", null,{expires:new Date(Date.now())})
    res.send({
        message: "User logged out successfully"
    }) // Send the user data back to the client
})

module.exports = authRouter // Export the router so that it can be used in other files