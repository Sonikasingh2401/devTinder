const express = require('express');
const {validateSignUpData} = require('../utils.js/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');


const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
    try{
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password,5);
    console.log(passwordHash);

//Creating the new instance of the User model
    const user = new User({
        firstName, lastName, emailId, password:passwordHash,
    });
    
        await user.save();
        res.send("data saved successfull..");
    }
    catch(err){
        res.status(400).send("Data not saved.." +err.message)
    }
 });

authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid login credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

            //Create a token
            const token = await user.getJWT();

            res.cookie("token",token, {expires: new Date(Date.now() + 900000)});
            res.send("Login successfull");
        }else{
            throw new Error ("Invalid login credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR : " +err.message)
    }
 });

 authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null, {expires: new Date(Date.now())})
    .send('You are logout successfull.')
 });

 module.exports = authRouter;