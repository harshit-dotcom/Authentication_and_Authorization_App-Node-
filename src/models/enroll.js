const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true,
    },
    lastname: {
        type:String,
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    address: {
        type:String,
        required:true
    },
    state: {
        type:String,
        required:true
    },
    zipcode: {
        type:Number,
        required:true
    }
})

const Register = new mongoose.model("Users", registrationSchema);
module.exports = Register;