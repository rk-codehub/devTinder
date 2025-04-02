const express = require('express');

const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateSignUpData } = require('../utils/validation')
const validator = require('validator');

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
    // VALIDATION OF DATA
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // ENCRYPT THE PASSWORD
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({firstName, lastName, emailId, password: passwordHash});
        // CREATING A NEW INSTANCE OF THE USER MODEL
        await user.save();
        res.send("User Added successfully!");
    } catch (error) {
        res.status(400).send("SIGNUP ERROR: " + error.message);
    }
})

authRouter.post('/login', async(req, res) => {
    try {
        const { emailId, password } = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error('Invalid emailId');
        }
        const user = await User.findOne({ emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.bcryptPwd(password);
        if(isPasswordValid) {
            const token = await user.getJWT();
            res.cookie('token', token, { expires: new Date(Date.now() + 60 * 60 * 1000), httpOnly: true });
            res.send('Login credentials is correct');
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("LOGIN ERROR: " + error.message);
    }
})

authRouter.post('/logout', async(req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
    }).send("log out successful");
})

module.exports = authRouter;