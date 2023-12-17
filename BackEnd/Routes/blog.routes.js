const {Router} = require("express")
const {BlogModel} = require("../Models/blogModel");
const { UserModel } = require("../Models/userModel");
const blogger = Router()
blogger.get("/",async (req,res)=>{
    const blogs = await BlogModel.find();
    res.send(blogs)
})
blogger.post("/create", async (req,res)=>{
    const {title,description} = req.body;
    const id = req.user_id
    const user = await UserModel.findOne({_id:id})
    const {name,email} = user;
    try {
        const new_blog = new BlogModel({
            title:title,
            description:description,
            author_id:id,
            author_name:name,
            author_email:email
        })
        await new_blog.save()
        res.send("Blog Created Successfully")
    } catch (error) {
        res.send("error While Creating Blog")
    }
})
blogger.put("/update/:id", async(req,res)=>{
    const {id} = req.params;
    const {title,description} = req.body;
    try {
        await BlogModel.findByIdAndUpdate({_id:id},{title,description})
        res.send("Blog Updated SuccessFully")
    } catch (error) {
        res.send("Error While Updating Blog")
        console.log(error)
    }
})
blogger.delete("/delete/:id",(req,res)=>{
    console.log(req.query)
    res.send(`This Is Delete Method For id ${req.params.id} `)
})
module.exports= {blogger}