const express = require("express")
const app = express()

app.use((req, res, next) => {
    console.log("Request received")
    res.send("Hello World")
    next();
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
