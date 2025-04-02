const express = require("express");
const connectDB = require('./config.js/database');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
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

// app.delete("/user",async (req,res)=>{
//     const userId = req.body.userId;

//     try{
//         const deleteduser = await User.findByIdAndDelete({userId}); 
//         res.send("User is deleted..")
//     }
//     catch(err){
//         res.status(404).send("User is not deleted .."+err);
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

