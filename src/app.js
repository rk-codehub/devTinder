const express = require('express');
const connectDB = require('./config/database');
const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
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

app.get('/login', async(req, res) => {
    try {
        const { emailId, password } = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error('Invalid emailId');
        }
        const user = await User.findOne({ emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await User.bcryptPwd(password);
        if(isPasswordValid) {
            const token = await User.getJWT();
            res.cookie('token', token, { expires: new Date(Date.now() + 60 * 1000), httpOnly: true });
            res.send('Login credentials is correct');
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("LOGIN ERROR: " + error.message);
    }
})

app.get('/profile',userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send('profile error: ' + error);
    }
})

app.post('/sendConnectionRequest',userAuth, async(req, res) => {
    // SENDING A CONNECTION REQUEST
    console.log("SENDING A CONNECTION REQUEST");
    res.send("SENDING A CONNECTION REQUEST");
})


connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 3000...");
    });
}).catch(err => {
    console.log("Database can not be connected!!")
});