const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://rknode:nGjsNLYbCay0CToi@learnnode.4ijgr.mongodb.net/devTinder"); //THIS IS HOW YOU CONNECT TO YOUR CLUSTER
}
module.exports = connectDB;