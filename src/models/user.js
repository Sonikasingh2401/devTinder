const mongoose = require('mongoose');
const validator = require('validator');   //using validator library for Email and other validation methods

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
        required:true,
        lowercase:true,
        unique:true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Enter valid email id - " + value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password should be Strong." + value);
            }
        }

    },
    age:{
        type:Number,
        min:18,
        //required : true,
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
    },
},
{
    timestamps : true,
});

module.exports = mongoose.model("User",userSchema);
//or
//const userModel = mongoose.model("User",userSchema);
//module.exports = userModel;


