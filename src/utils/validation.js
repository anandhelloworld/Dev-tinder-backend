
var validator = require('validator');

const validateSignupData = (req) => {
    const { email, password, firstName, lastName, age } = req.body;
    if (!email || !password || !firstName || !lastName || !age) {
        throw new Error("Missing required fields")
    }
    if(firstName.length < 3 || firstName.length > 20) {
        throw new Error("First name should be in range of 3-20")
    }
    if(lastName.length < 3 || lastName.length > 20) {
        throw new Error("Last name should be in range of 3-20")
    }

    if(!validator.isEmail(email)) {
        throw new Error("Invalid email")
    }
    if(!validator.isStrongPassword(password)) { 
        throw new Error("Password is weak") 
    }
    if(!validator.isInt(age, {min: 1, max: 100})) {
        throw new Error("Invalid age")
    }
    return true;
}

module.exports = { validateSignupData } // Export the function so that it can be used in other files