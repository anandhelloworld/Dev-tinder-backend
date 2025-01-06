const express = require("express")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const { validateSignupData } = require('./utils/validation.js')
const jwt = require('jsonwebtoken');
const app = express()
require("./config/database.js")  // Import the mongoose module and connect to the MongoDB database


app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")



// app.get("/users", async (req, res) => {
//     const emailId = req.body.emailId;
//     try {
//         const users = await User.findOne({ emailId: emailId }) // Find one the users in the database
//         console.log(users)
//         if (users.length === 0) {
//             res.send("No user found")
//         }
//         res.send(users) // Send the users data back to the client
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error)
//     }
// })


// app.get('/feed', async (req, res) => {
//     try {
//         const users = await User.find() // Find all the users in the database
//         res.send(users) // Send the users data back to the client
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.delete('/users', async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const users = await User.findByIdAndDelete(userId) // Find all the users in the database
//         res.send({
//             "deleted": users,
//             "message": "User deleted successfully"
//         }) // Send the users data back to the client
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.patch('/users', async (req, res) => {
//     const userId = req.body.userId;
//     const update = req.body;
//     const ALLOWED_FIELDS = ["firstName", "lastName", "emailId", "PhotoUrl", "password", "age"]
//     const isUpdateAllowed = Object.keys(update).every((k) => ALLOWED_FIELDS.includes(k))
//     try {
//         if (!isUpdateAllowed) {
//             throw new Error("Invalid fields")
//         }
//         const users = await User.findByIdAndUpdate(userId, update, { new: true }) // Find all the users in the database
//         res.send({ "updated": users, "message": "User updated successfullly" }) // Send the users data back to the client
//     } catch (error) {
//         res.status(400).send("Err Message: " + error.message)
//     }
// })
// app.patch('/users/:emailId', async (req, res) => {
//     const userId = req.body.userId;
//     const update = req.body;
//     try {
//         const users = await User.findByIdAndUpdate(userId, update, { new: true }) // Find all the users in the database
//         res.send({ "updated": users, "message": "User updated successfullly" }) // Send the users data back to the client
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

