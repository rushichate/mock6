const express = require("express");
const { BlogModel } = require("../models/blog.model");

const blogRouter = express.Router()

blogRouter.get("/",async(req,res)=>{
    try{
       const blogs = await BlogModel.find()
       res.status(400).json(blogs)
    }catch(err){
        res.status(400).json(err.message)
    }
})




module.exports = {
    blogRouter
}