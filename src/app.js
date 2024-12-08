const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello from the express- nodejs server - test devtinder");
})

app.use("/namaste",(req,res)=>{
    res.send("Hello from the express- nodejs server - namaste devtinder");
})
app.listen(4000,()=>{
    console.log("Server is successfully running");
});


