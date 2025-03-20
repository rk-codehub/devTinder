const express = require('express');

const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS

// THIS WILL ONLY HANDLE GET CALL TO /user
app.get("/user", (req, res) => {
    res.send({ firstname: "R", lastname: "K" })
})

app.post("/user", (req, res) => {
    console.log("Save Data to the database")
    res.send("Data successfully saved to the database")
})

app.delete("/user", (req, res) => {
    console.log("Save Data to the database")
    res.send("Data deleted successfully")
})

// THIS WILL MATCH ALL THE HTTP METHOD API CALLS TO /test
app.use("/test",(req, res) => {
    res.send("HELLO FROM THE SERVER");
});

app.listen(3000, () => {
    console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 3000...");
});