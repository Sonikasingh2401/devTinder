const express = require('express');
const {userAuth} = require('../middleware.js/auth');
const { validateEditProfileData } = require('../utils.js/validation');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req,res)=>{

    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : " +err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{

    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request !!");
        };
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
      //  res.send(`${loggedInUser.firstName} - Your Profile updated successfully..`);  or  to give the data of the user back--

        res.json({
            message: `${loggedInUser.firstName} - Your Profile updated successfully..`,
            data: loggedInUser,
        });
    }
    catch(err){
        res.status(400).send("ERROR : " +err.message);
    }
    
});

module.exports = profileRouter;