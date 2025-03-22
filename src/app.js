const express = require('express');
const connectDB = require('./config/database');
const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS
const User = require("./models/user")

app.use(express.json());
app.post("/signup", async (req, res) => {
    // console.log(req.body)
    // const userObj = req.body
    const user = new User(req.body);
    try {
        // CREATING A NEW INSTANCE OF THE USER MODEL
        await user.save();
        res.send("User Added successfully!");
    } catch (error) {
        console.log(error);
    }
})


connectDB().then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
        console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 3000...");
    });
}).catch(err => {
    console.log("Database can not be connected!!")
});