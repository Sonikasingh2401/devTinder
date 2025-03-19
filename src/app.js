const express = require("express");
const connectDB = require('./config.js/database');
const app = express();
const User = require('./models/user');
const {validateSignUpData} = require('./utils.js/validation')
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middleware.js/auth");

app.use(express.json());
app.use(cookieParser());

//To save the data into database 
app.post("/signup",async (req,res)=>{
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

app.post("/login",async(req,res)=>{
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

app.get("/profile", userAuth, async (req,res)=>{

    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : " +err.message);
    }
});

//sending the connection request
app.post("/sendConnectionRequest",userAuth, (req,res)=>{
    
    const user = req.user;
    try{
        res.send(user.firstName + " sent a connection request..")
    }
    catch(err){
        res.status(400).send("Error sending in connection request..");
    }
});


//Delete a user

app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;

    try{
        const deleteduser = await User.findByIdAndDelete({userId}); 
        res.send("User is deleted..")
    }
    catch(err){
        res.status(404).send("User is not deleted .."+err);
    }
})

//Update a User details

app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["age","city","phoneNumber"];
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        const updatedUser = await User.findByIdAndUpdate({_id: userId}, data,{
            runValidators: true,
        });
        res.send("User Updated successfully done..");

    }
    catch(err){
        res.status(404).send("Something went wrong .."+err.message);
    }
})

connectDB()
.then(()=>{
    console.log("Database connection is made successfully..");
    app.listen(7777,()=>{
        console.log("Server is successfully running on port 7777.");
    });
})
.catch((err)=>{
    console.log("Connection unsuccessfull!!" +err.message);
});