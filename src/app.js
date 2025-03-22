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

// GET USER BY EMAIL
app.get("/user", async (req, res) => {
    const email = req.body.emailId;
    try {
        const user = await User.findOne({}); //{ emailId: emailId }
        if(!user.length) {
            res.status(404).send("User not found")
        }
        res.send(user);
    } catch (error) {
        console.log("user: ", error);
    }
})

// FEED API - GET /feed - GET ALL USERS FROM THE DATABASE
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (error) {
        console.log("feed: ", error);
    }
})

// DELETE A USER
app.delete('/user', async (req, res) => {
    const id = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete({ _id: id })
        const user = await User.findByIdAndDelete(id)
        res.send("User deleted successfully!!");
    } catch (error) {
        
    }
})


// UPDATE DATA OF THE USER
app.patch("/user", async (req, res) => {
    const userId = req.body._id;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before" });
        console.log(user);
        res.send("User Updated Successfully")
    } catch (error) {
        
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