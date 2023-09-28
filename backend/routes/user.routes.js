const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Redis = require("ioredis")
const redis = new Redis()
const { UserModel } = require("../models/user.model");
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {username,avatar,email,password} = req.body;
    try{
        const isEmailPresent = await UserModel.findOne({email})
        if(isEmailPresent){
            return res.status(200).json({msg:"Email already present"})
        }
            const hashPassword = bcrypt.hashSync(password,4)
            const user = new UserModel({username,avatar,email,password:hashPassword})
            await user.save();
            res.status(200).json({msg:"registration successful"})
    }catch(err){
        res.status(400).json(err.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.findOne({email});
        if(!user){
         return  res.status(400).json({mag:"Please register first"});
        }
        const isPassword = bcrypt.compareSync(password,user.password)
           if(!isPassword){
            return res.status(400).json({msg:"Wrong Credentials"});
           }
           const token = jwt.sign({userID:user._id},"masai")

            await redis.set("_token",token,"EX",60*5)
           res.status(200).json({msg:"Login successful",token:token,userName:user.username})
    }catch(err){
        res.status(400).json(err.message)
    }
})

module.exports = {
    userRouter
}