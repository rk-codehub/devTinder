const express = require('express');

const app = express(); // IT CREATES AN APPLICATION OF EXPRESS JS

app.use("/test",(req, res) => {
    res.send("HELLO FROM THE SERVER");
});

app.listen(3000, () => {
    console.log("SERVER IS SUCCESSFULLY LISTENING ON PORT 3000...");
});