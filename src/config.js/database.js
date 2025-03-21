const mongoose = require("mongoose");
const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://sonikasingh2401:Ds3moaJwSclng0Ga@namastenode.felhz.mongodb.net/devTinder"
        );
};

module.exports = connectDB;

