const mongoose = require('mongoose');

const connectionRequest = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the user collection
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: `{VALUE} is incorrect status type`
        }
    }
}, {
    timestamps: true
})

connectionRequest.index({ fromUserId: 1, toUserId: 1 })

connectionRequest.pre('save', function (next) {
    const connectionRequest = this;
    // CHECK IF FROMUSERID IS SAME AS TOUSERID
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('you cannot send connection request to yourself!');
    }
    next(); //DON'T FORGET TO CALL NEXT 
});

const ConnectionRequestModel = mongoose.model('ConnectionRequest', connectionRequest);
module.exports = ConnectionRequestModel;