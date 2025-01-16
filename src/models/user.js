const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (email) => {
            if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
                throw new Error("Email is invalid")
            }
        }
    },
    PhotoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required:true
    },
    age: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
        enum:{
            values:["male", "female", "others"],
            message: '{VALUE} is not supported'
        }
    },
    role: {
        type: String,
        trim: true,
        default: 'user'
    },
    skills: {
        type: Array,

    }

});

module.exports = mongoose.model('User', UserSchema); // Export the model so that it can be used in other files