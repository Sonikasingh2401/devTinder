const express = require("express");
const connectDB = require('./config.js/database');
const app = express();
const User = require('./models/user');
const user = require("./models/user");

app.use(express.json());

//To save the data into database 
app.post("/signup",async (req,res)=>{

//Creating the new instance of the User model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("data saved successfull..");

    }
    catch(err){
        res.status(400).send("Data not saved.." +err.message)
    }
    
 });

//To Get the data from the database by Gender - male

app.get("/user",async (req,res)=>{
    const userGender = req.body.gender;

    try{
         const users = await User.find({gender: userGender})
         if(users.length === 0){
            res.status(404).send("No male user..")
         }else{
            res.send(users);
         }
         
    }
    catch(err){
        res.status(400).send("Something went wrong" +err.message)
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