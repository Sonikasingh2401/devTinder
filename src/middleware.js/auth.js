const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next)=>{
    //Read the token from the cookies
    try{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).send("Please login..!!")
    }
    const decodeObj = await jwt.verify(token, "Dev@Tinder");

    const {_id} = decodeObj;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found !!");
    };
    req.user = user;         //attach the user with the request to send it to next phase.
    next();
    }
    catch(err){
        res.status(400).send("User not authorized");
    }

};

module.exports = {
    userAuth,
};