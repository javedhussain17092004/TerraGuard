const express=require("express");
const jwt=require("jsonwebtoken");
const User=require("../models/user.js");

const protect=async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
    }   
    const token=authHeader.split(" ")[1];

    try{
        const decode=jwt.verify(token,process.env.JWT_TOKEN);
        const user=await User.findById(decode.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user; 
        next();

    }catch(err){
        console.error("error in varification",err.message);
        res.status(500).json({message:"error in protection"});
    }   
}

module.exports=protect;