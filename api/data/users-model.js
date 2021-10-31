const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        unique:true,
        required:true

    },
    name:{
        type:String,
        unique:true,
        required:true
    }
});


mongoose.model("User", UserSchema, "users");