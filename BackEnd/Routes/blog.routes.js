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
    const {_id,name,email} = req.user;
    console.log(req.user)
    try {
        const new_blog = new BlogModel({
            title:title,
            description:description,
            author_id:_id,
            author_name:name,
            author_email:email
        })
        await new_blog.save()
        res.send("Blog Created Successfully")
    } catch (error) {
        res.send("error While Creating Blog")
        console.log(error)
    }
})
blogger.put("/update/:id", async(req,res)=>{
    const {id} = req.params;
    const {title,description} = req.body;
    // const {_id,name,email} = req.user;
    const {_id,name,email} = req.user;
    console.log(req.user)
    const blog = await BlogModel.findOne({id});
    if(blog.author_id==_id){
        try {
            await BlogModel.findByIdAndUpdate({_id:id},{title,description})
            res.send("Blog Updated SuccessFully")
        } catch (error) {
            res.send("Error While Updating Blog")
            console.log(error)
        }
    }
    else{
        res.send("You Can't Edit Others Blog");
    }
})
blogger.delete("/delete/:id",(req,res)=>{
    console.log(req.query)
    res.send(`This Is Delete Method For id ${req.params.id} `)
})
module.exports= {blogger}