const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
    },
    lastName:{
        type: String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    city:{
        type: String,
    },
    phoneNumber:{
        type:Number,
    },
});

module.exports = mongoose.model("User",userSchema);
//or
//const userModel = mongoose.model("User",userSchema);
//module.exports = userModel;


