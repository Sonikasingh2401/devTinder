const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleware.js/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');

const USER_SAFE_DATA = "firstName lastName about";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", USER_SAFE_DATA);
      // }).populate("fromUserId", ["firstName", "lastName"]);
  
      res.json({
        message: "Data fetched successfully",
        data: connectionRequests,
      });
    } catch (err) {
      res.statusCode(400).send("ERROR: " + err.message);
    }
  });

  userRouter.get("/user/connections", userAuth, async (req, res) => {  
    try {  
      const loggedInUser = req.user;  
      
      // Debug: Log the user ID being queried  
      console.log("Fetching connections for user:", loggedInUser._id);  
  
      const connectionRequests = await ConnectionRequest.find({  
        $or: [  
          { toUserId: loggedInUser._id, status: "accepted" },  
          { fromUserId: loggedInUser._id, status: "accepted" }  
        ],  
      })  
      .populate("fromUserId", USER_SAFE_DATA)  
      .populate("toUserId", USER_SAFE_DATA);  
  
      // Debug: Log raw query results  
      console.log("Raw connection requests:", connectionRequests);  
  
      const data = connectionRequests  
        .map((row) => {  
          if (!row.fromUserId || !row.toUserId) {  
            console.warn("Incomplete population in request:", row._id);  
            return null;  
          }  
          return row.fromUserId._id.equals(loggedInUser._id)   
            ? row.toUserId   
            : row.fromUserId;  
        })  
        .filter(Boolean);  
  
      // Debug: Log final output  
      console.log("Processed connections:", data);  
  
      res.json({  
        message: "YOUR CONNECTIONS :",   
        data: data  
      });  
      
    } catch (err) {  
      console.error("Error in /user/connections:", err);  
      res.status(400).json({   
        message: "Cannot find connections",  
        error: err.message  
      });  
    }  
  });  

userRouter.get("/user/feed", userAuth , async (req,res) =>{

    try{
        const loggedInUser = req.user;

        const page= parseInt(req.query.page)  | 1;
        let limit = parseInt(req.query.limit) | 10;
        limit = limit>50 ? 50 : limit;

        const skip = (page-1)*limit;

    const connectionRequest = await ConnectionRequest.find({
        $or: [{fromUserId: loggedInUser._id}, {toUserId : loggedInUser._id} ],
        }).select("fromUserId toUserId");
        //console.log(connectionRequest);

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    });
    //console.log(hideUsersFromFeed);

    const users = await User.find ({
        $and: [
            {_id: {$nin: Array.from(hideUsersFromFeed)}},
            {_id: {$ne: loggedInUser._id}}
        ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    res.json({data: users});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

});
module.exports = userRouter;