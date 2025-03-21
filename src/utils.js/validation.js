const validator = require('validator');

const validateSignUpData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName  || !lastName){
        throw new Error("Name is not valid..");
    }else if
    (!validator.isEmail(emailId)){
        throw new Error ("EmailId is not valid..");
    }else if
    (!validator.isStrongPassword(password)){
        throw new Error("Password should be Strong..");
    }
};

const validateEditProfileData = (req)=>{

    const allowedEditData = ["firstName","lastName","age","gender","city","about"];
    const isallowedEditData  = Object.keys(req.body).every((field)=> allowedEditData.includes(field));
    return isallowedEditData;
}

module.exports = {
    validateSignUpData, validateEditProfileData
};