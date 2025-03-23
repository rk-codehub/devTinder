const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,        
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String
    },
    emailId : {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email not valid: ", value);
            }
        }
    },
    password: {
        type: String,
        required: true ,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Your password is weak ");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'others'].includes(value)) {
                throw new Error("Gender not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("photo url is not an url: ");
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
