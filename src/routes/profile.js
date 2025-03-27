const express = require('express');
const {userAuth} = require('../middlewares/auth');
const {validateProfileEditData} = require('../utils/validation')

const profileRouter = express.Router();

profileRouter.get('/profile/view',userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send('profile error: ' + error);
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if(!validateProfileEditData(req)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.send({message: 'Edit was successfull', data: loggedInUser});
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = profileRouter