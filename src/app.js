const express = require("express");
const connectDB = require('./config.js/database');
const app = express();
const User = require('./models/user');

app.post("/signup",async (req,res)=>{
    const user = new User({
        firstName:"Ursha",
        lastName:"Kanol",
        age:28,
        gender:"female",
        city:"Goa",
        phoneNumber:9874745626,
    });
    try{
        await user.save();
        res.send("data saved successfull..");
    }
    catch(err){
        res.status(400).send("Data not saved.." +err.message)
    }
    
});

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






