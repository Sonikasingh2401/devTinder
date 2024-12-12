const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    console.log(req.query);
    res.send({firstname: "Sonika", lastname:"Singh"});
})

app.get("/user/:userId/:name",(req,res)=>{
    console.log(req.params);
    res.send({firstname: "Sonika", lastname:"Singh"});
})

app.post("/user",(req,res)=>{
    console.log("post call made successfully..")
    res.send("Data saved successfully.")
})


app.use("/test",(req,res)=>{
    res.send("Hello from the express- nodejs server - test devtinder");
})

app.use("/", (req,res)=>{
    res.send("This is just an slash page..")
})

app.listen(4000,()=>{
    console.log("Server is successfully running");
});


