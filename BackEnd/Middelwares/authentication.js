const {UserModel} = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const authentication = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(req.url=="/"){
        next();
    }
    else{
        if(!token){
            res.status(404).send("Please Login First token not found");
        }
        else{
            jwt.verify(token,process.env.secret_key, async (err,decoded)=>{
                if(err){
                    res.send("Please Login First");
                }
                else{
                    const {id} = decoded;
                    req.user_id=id;
                    next();
                }
            })
        }
    }
}
module.exports={authentication}