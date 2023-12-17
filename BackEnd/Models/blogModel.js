const mongoose = require("mongoose")
const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    author_name:{type:String,required:true},
    author_email:{type:String,required:true}
},{
    timestamps:true,
})
const BlogModel = mongoose.model("blog",blogSchema);
module.exports = {BlogModel};