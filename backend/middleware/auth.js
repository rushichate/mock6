const jwt = require("jsonwebtoken")
const redis = require("../routes/user.routes")

const varify  = (req,res,next) =>{
    let token = localStorage.getItem("token")
    jwt.verify(token,"masai",function(err,decoded){
        if(decoded){
            req.body.userID = decoded.userID;
            next()
        }else{
            res.status(400).send("Please Login First")
        }
    })
}

module.exports = {
    varify
}