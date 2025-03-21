const express = require('express');
const {userAuth} = require('../middleware.js/auth');

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth, (req,res)=>{
    
    const user = req.user;
    try{
        res.send(user.firstName + " sent a connection request..")
    }
    catch(err){
        res.status(400).send("Error sending in connection request..");
    }
});

module.exports = requestRouter;