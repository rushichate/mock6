const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    username:{type:String,required:true},
    title: {type:String,required:true},
    content:{type:String,required:true},
    catagory:{type:String,required:true},
    date:{type:Date},

},{
    versionKey:false
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports = {
    BlogModel
}