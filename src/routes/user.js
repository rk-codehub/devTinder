const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require("../models/user");

const USER_SAVE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get('/user/requests/received', userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate("fromUserId", USER_SAVE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);


        res.json({
            message: "Data fetched successfully",
            data:connectionRequests
        })
    } catch (error) {
        res.status(400).send("USER REQUEST ERROR" + error.message);
    }
})

userRouter.get('user/connections', userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", USER_SAVE_DATA).populate("toUserId", USER_SAVE_DATA);
        const data = connectionRequest.map((res) => {
            if(res.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return res.toUserId;
            }
            return res.fromUserId;
        });
        res.json({
            message: "Conenction Request fetched",
            data,
        })
    } catch (error) {
        res.status(400).send("USER CONNECTION ERROR: " + error.message);
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50 : limit;
      const skip = (page - 1) * limit;
      // Find all conneciton request (sent + recieved)
      const connectionRequest = await ConnectionRequestModel.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      }).select("fromUserId toUserId");
  
      const hideUsersFromFeed = new Set(); // allways set unique values
      connectionRequest.forEach((cr) => {
        hideUsersFromFeed.add(cr.fromUserId.toString());
        hideUsersFromFeed.add(cr.toUserId.toString());
      });
      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUsersFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
        .select(USER_SAVE_DATA)
        .skip(skip)
        .limit(limit);
      res.send(users);
    } catch (error) {
      res.status(400).send("USER FEED ERROR: " + error.message);
    }
  });

module.exports = userRouter;