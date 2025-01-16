const moongose = require('mongoose');
const { trim } = require('validator');
const connectionSchema = new moongose.Schema({
    fromUserId: {
        type: "String",
        ref: "User",
        required: true,
        trim: true
    },
    toUserId: {
        type: "String",
        required: true,
        trim: true
    },
    status: {
        type: "String",
        enum: {
            values: ['matched', 'pending', 'intrested', 'rejected',],
            message: '{VALUE} is not supported'
        },
        required: true,
        trim: true,
        default: "pending"
    }
}, { timestamps: true })
connectionSchema.index({ fromUserId: 1, toUserId: 1 });
connectionSchema.pre('save', async function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()) {
        throw new Error("Cant send request to self");
    }
    next();
})
const ConnectionRequest = moongose.model('ConnectionRequest', connectionSchema);
module.exports = ConnectionRequest;