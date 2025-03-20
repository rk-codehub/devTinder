const express = require('express');

const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS

// THIS WILL ONLY HANDLE GET CALL TO /user

app.get("/user/:userId", (req, res) => {
    console.log(req.params)
    res.send({ firstname: "R", lastname: "K" })
})

app.listen(3000, () => {
    console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 3000...");
});