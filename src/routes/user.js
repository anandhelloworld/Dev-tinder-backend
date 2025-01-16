const express = require("express");
const userAuth = require("../middlewares/auth");
const userRouter = express.Router();
const Connections = require("../models/connection")
const User = require('../models/User');
// userRouter.get("/users/requests",userAuth, async (req, res) => {
//     try {
//         const loggedInUsser = req.user;
//         const connectionRequests = await ConnectionRequest.find({
//             toUserId: loggedInUsser._id,
//             status: "pending"
//         }).populate("fromUserId",[ "firstName", "lastName", "PhotoUrl","age"]);

//     } catch (error) {
//         res.status(500).send("Error: "+error.message)
//     }
// })
// userRouter.get("/user/connections", userAuth, async (req, res) => {
//     try {
//         const loggedInUser = req.user;
//         const connections = await ConnectionRequest.find({
//             $or: [
//                 { fromUserId: loggedInUser._id },
//                 { toUserId: loggedInUser._id }
//             ],
//             status: "matched"
//         }).populate("fromUserId", ["firstName", "lastName", "PhotoUrl", "age"])
//         // .populate("toUserId", ["firstName", "lastName", "PhotoUrl", "age"]);

//         //TODO : check if the user is fromUserId or toUserId and return the other user

//         const data = connections.map((row) => row.fromUserId)
//         res.json({
//             data:{data}
//         })
//     } catch (error) {
//         res.status(500).send("Error: "+error.message)
        
//     }
// })

userRouter.get("/feed",userAuth, async (req,res)=>{

    let  limit  = req.params.limit||10
    limit = limit > 50 ? 50 :limit
    const  page   = req.params.page|1
    const  skip  = (page-1)*limit
    try {
        const loggedInUser = req.user;
    //Get all my ConnectionRequest with to or from = loggedinuser_id
    console.log("loggedInUser: ",loggedInUser)
    const myConnectionRequests = await Connections.find({}).select("fromUserId , toUserId")
    let hideprofiles = new Set()
    myConnectionRequests.forEach((req)=>{
        hideprofiles.add(fromUserId)
        hideprofiles.add(toUserId)
    })
    const user = await User.find({
        $and:[
            {_id:{$nin:[Array.from(hideprofiles)]}},
            {_id : {$ne: loggedInUser._id}}
        ]
    }).skip(skip).limit(limit)
    console.log("user: ",user)
    res.send(user)
    } catch (error) {
        console.log("error:",error)
        res.send("error:")
    }
})



module.exports = userRouter;