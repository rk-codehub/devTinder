const express = require('express');
const {userAuth} = require('../middlewares/auth');

const jwt = require('jsonwebtoken');
const ConnectionRequest = require('../models/connectionRequest');
const user = require('../models/user');

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId',userAuth, async(req, res) => {
    try {
        const fromUserId = req.user._id;
        const { toUserId, status } = req.params;
        const allowedStatus = ['ignored', 'interested'];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status type: ' + status
            })
        }

        const toUser = await user.findById(toUserId);
        if(!toUser) {
            return res,status(400).json({
                message: 'User not found'
            })
        }

        // IF THERRE IS AN EXISTING CONNECTIONREQUEST
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]            
        });

        if(existingConnectionRequest) {
            return res.status(400).json({message: 'connection request already exists!!'});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + "is" + status + "in" + toUser.firstName,
            data,
        })
    } catch (error) {
        res.status(400).send("CONNECTION REQUEST ERROR: "+ error.message);
    }
})

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        const allowedStatus = ['accepted', 'rejected'];
        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid Status!!!");
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser,
            status: 'interested'                
        });
        if(!connectionRequest) {
            throw new Error("Connection Request not found!!!")
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request " + status,
            data,
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = requestRouter;