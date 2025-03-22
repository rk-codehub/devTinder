const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth')

const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS

app.get('/getUserData', (req, res) => {
    // LOGIC OF USER DATA AND GET USER DATA
    throw new Error("asdfuhjdsk");
    res.send('user data')
})

app.use("/", (err, req, res, next) => {
    if(err) {
        // Log your eeror 
        res.status(500).send("something went wrong")
    }
});

app.listen(3000, () => {
    console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 3000...");
});