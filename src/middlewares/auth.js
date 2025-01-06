const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET||"secret")
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error("unauthorized")
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })      

    }
}   

module.exports = userAuth