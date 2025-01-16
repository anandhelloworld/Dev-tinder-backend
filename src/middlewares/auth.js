const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const userAuth = async (req, res, next) => {
    try {
        const tokken = req.cookies.tokken
        const decoded = jwt.verify(tokken,"secretKey")
        const user = await User.findOne({ _id: decoded.userId })
        if (!user) {
            return res.status(404).send("user not found")
        }
        // req.tokken = tokken
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })      

    }
}   

module.exports = userAuth