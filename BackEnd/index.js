const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {connection} = require("./db.js")
const {UserModel} = require("./Models/userModel.js")
const {blogger} = require('./Routes/blog.routes.js');
const { authentication } = require("./Middelwares/authentication.js")


const app = express();
app.use(express.json()); 

app.use("/blog",authentication,blogger)

app.get("/",(req,res)=>{
    res.send("This Is Base URL");
})
app.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        res.status(409).send("Email Already Exists");
    }
    else{
        try {
            bcrypt.hash(password, 3, async function(err, hash) {
                const user = new UserModel({
                    name:name,
                    email:email,
                    password:hash
                })
                await user.save();
                res.status(201).send("SignUp SuccessFull");
            });
        } catch (error) {
            console.log("Error While Saving User Data");
            console.log(error)
            res.status(500).send("Internal Server Error");
        }
    }
})
const getPayload = (user)=>{
    return {
        id:user._id,
        username:user.username
    }
}
app.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(error,result)=>{
            if(result){
                const token = jwt.sign(getPayload(user), process.env.secret_key);
                res.status(200).send({ msg: "Login SucessFull", token: token });
            }
            else{
                res.status(401).send("Invalid Credentials");
            }
        })
    }
    else{
        res.status(404).send("User Not Found! Sign Up First");
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