const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } 
    else if(!validator.isEmail(emailId)) {
        throw new Error("email is not valid");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("pls enter strong pwd");
    }
};

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
    // const { age, gender, photoUrl, skills } = req.body
}

module.exports = {validateSignUpData, validateProfileEditData};