const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type:String,
        requires:true,
        lowercase:true,
        unique:true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Enter valid email id - " + value);
            }
        }

    },
    age:{
        type:Number,
        required : true,
    },
    gender:{
        type:String,
        validate(value){
             if(!["male","female","other"].includes(value)){
             throw new Error ("Gender is not valid");
                }
        },
    },
    city:{
        type: String,  
    },
    country:{
        type : String,
        default : "India",
    },
    phoneNumber:{
        type:Number,
        required : true,
        unique : true,
    },
},{
    timestamps : true,
});

module.exports = mongoose.model("User",userSchema);
//or
//const userModel = mongoose.model("User",userSchema);
//module.exports = userModel;


