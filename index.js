const express = require("express");
const cors = require("cors")
const { connection } = require("./backend/db");
const { userRouter } = require("./backend/routes/user.routes");
const { varify } = require("./backend/middleware/auth");
const { blogRouter } = require("./backend/routes/blog.route");
require("dotenv").config();
const app = express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(varify)
app.use("/blogs",blogRouter)


app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("connected to DB")
      console.log(`running on port ${process.env.port}`)
    }catch(err){
        res.status(400).send(err)
    }
})

