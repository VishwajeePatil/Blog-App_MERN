const express = require("express");
const bcrypt = require("bcrypt");
const {connection} = require("./db.js")
const {UserModel} = require("./Modules/userModel.js")
const app = express();
app.use(express.json()); 
app.get("/",(req,res)=>{
    res.send("This Is Base URL");
})
app.post("/signup",async(req,res)=>{
    const {name,username,password} = req.body;
    try {
        bcrypt.hash(password, 3, async function(err, hash) {
            const user = new UserModel({
                name:name,
                username:username,
                password:hash
            })
            await user.save();
            res.send("SignUp SuccessFull")
        });
    } catch (error) {
        console.log("Error While Saving User Data");
        console.log(error)
    }
})
app.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username})
    if(user){
        res.send("User Found");
    }
    else{
        res.send("User Not Found");
    }
})


app.listen(8000,async()=>{
    console.log("Server Is Live On Port 8000")
    try {
        await connection;
        console.log("Database Connected SuccessFullly")
    } catch (error) {
        console.log("Error While Connecting Database")
        console.log(error)
    }
})