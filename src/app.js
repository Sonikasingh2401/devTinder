const express = require("express");
const connectDB = require('./config.js/database');
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./router.js/auth');
const profileRouter = require('./router.js/profile');
const requestRouter = require('./router.js/request');
const userRouter = require('./router.js/user');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

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
});

//Update a User details

// app.patch("/user/:userId",async(req,res)=>{
//     const userId = req.params?.userId;
//     const data = req.body;
//     try{
//         const ALLOWED_UPDATES = ["age","city","phoneNumber"];
//         const isUpdateAllowed = Object.keys(data).every((k)=>
//             ALLOWED_UPDATES.includes(k)
//         );
//         if(!isUpdateAllowed){
//             throw new Error("Update not allowed");
//         }

//         const updatedUser = await User.findByIdAndUpdate({_id: userId}, data,{
//             runValidators: true,
//         });
//         res.send("User Updated successfully done..");

//     }
//     catch(err){
//         res.status(404).send("Something went wrong .."+err.message);
//     }
// });

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

