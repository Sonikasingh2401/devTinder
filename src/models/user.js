const mongoose = require('mongoose');
const validator = require('validator');   //using validator library for Email and other validation methods
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    about:{
        type : String,
        default : "This is a default about..",
    },
    phoneNumber:{
        type:Number,
    },
},
{
    timestamps : true,
});

userSchema.methods.getJWT = async function(){

    const user = this;
    const token = await jwt.sign({_id : user._id},"Dev@Tinder",{expiresIn : '1d'});
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
};

module.exports = mongoose.model("User",userSchema);
//or
//const userModel = mongoose.model("User",userSchema);
//module.exports = userModel;


