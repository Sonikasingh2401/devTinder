/*app.get("/user",(req,res)=>{
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
    */



/*app.use("/user", (req,res,next)=>{
    console.log("Handling the routes of /user..")
    //res.send("This is just an slash page..")
    next();
});
app.use("/user", (req,res,next)=>{
    console.log("Handling the routes of /user..")
    //res.send("This is 2nd response..")
    next();
});
app.use("/user", (req,res)=>{
    console.log("Handling the routes of /user..")
    res.send("This is 3rd response..")
});  */

/*
app.use("/user", (req,res,next)=>{
        console.log("Handling the routes of /user 2..")
       // res.send("This is just an slash page..")
       next();
});

app.use("/user", (req,res,next)=>{
    console.log("Handling the routes of /user 1..")
    //res.send("This is just an slash page..")
    next();
})   */

    //Middlewares for /admin and /user
app.get("/admin",(req,res,next)=>{
    console.log("Admin authorizations is getting checked..");
    const token = "abcdsdfs";
    const isAdminAuth = token === "abcd";
    if(!isAdminAuth){
        res.status(401).send("You are not authorized to check these details..")
    }
    else{
        next();
    }
})
app.get("/admin/getAlldetails",(req,res)=>{
    console.log("Request made by the admin..")
    res.send("Data is fetched successfully by the admin..")
});

app.get("/admin/deleteAuser",(req,res)=>{
    console.log("Request made to delete a record..")
    res.send("Data is deleted successfully by the admin..")
});