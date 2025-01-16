const express = require("express")
const cookieParser = require('cookie-parser')
const app = express()
var cors = require('cors')
require("./config/database.js")  // Import the mongoose module and connect to the MongoDB database


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")
const userRouter = require("./routes/user.js")
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

