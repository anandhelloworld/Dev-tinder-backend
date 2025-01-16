const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { User } = require("../models/User");
const { isFQDN } = require("validator");
const ConnectionRequestModel = require("../models/connection");

try {

    requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
        const user = req.user;
        const toUserId = req.params.toUserId;

        if (user._id.toString() === toUserId.toString()) {
            throw new Error("Cant send request to self");
        }

        const validateToUser = await User.findById(toUserId);
        if (!validateToUser) {
            throw new Error("Invalid user");
        }

        const status = req.params.status;

        const validateStatus = ["rejected", "intrested"];
        const isValidStatus = validateStatus.includes(status);

        if (!isValidStatus) {
            throw new Error("Invalid status");
        }
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId: user._id, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: user._id }
            ]
        })

        if (existingConnectionRequest) {
            if (existingConnectionRequest.toUserId.toString() === user._id.toString() && existingConnectionRequest.status === status) {
                //update the status of connection to matched
                existingConnectionRequest.status = "matched";
                await existingConnectionRequest.save();
                res.json({
                    message: "Connection matched",
                    data: existingConnectionRequest
                })
            } else {
                throw new Error("Request already exits");
            }
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId: user._id,
            toUserId: toUserId,
            status: status
        })

        const savedRequest = connectionRequest.save();
        res.json({
            message: "Request sent",
            data: savedRequest
        })
    });

    requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
        const loggedInUsser = req.user;
        const { status, requestId } = req.params;
        const validateStatus = ["rejected", "accepted"];
        const isValidStatus = validateStatus.includes(status);
        if (!isValidStatus) {
            throw new Error("Invalid status");
        }
        const isValidToUserId = new ConnectionRequestModel.findById({
            _id: requestId,
            toUserId: loggedInUsser._id,
            status: "intrested"

        })
        if (!isValidToUserId) {
            throw new Error("Request not found");
        }
        isValidToUserId.status = status;
        const data = await isValidToUserId.save();
        res.json({
            message: "Request updated",
            data: data
        })

    })

} catch (error) {
    res.status(400).json({
        message: error.message,
    });
}


module.exports = requestRouter; 