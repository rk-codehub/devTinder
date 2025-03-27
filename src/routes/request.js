const express = require('express');
const {userAuth} = require('../middlewares/auth');

const jwt = require('jsonwebtoken');

const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest',userAuth, async(req, res) => {
    // SENDING A CONNECTION REQUEST
    console.log("SENDING A CONNECTION REQUEST");
    res.send("SENDING A CONNECTION REQUEST");
})

module.exports = requestRouter;