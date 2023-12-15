const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        required:true,
    }
})
const UserModel = mongoose.model("users",userSchema);
module.exports = {UserModel};