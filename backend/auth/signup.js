const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const express=require("express");
const mongoose=require("mongoose");
const User=require("../models/user.js");

const singup=async(req,res)=>{
    const {name,email,password,role,location}=req.body;
    try{
        if (!name || !email || !password || !role || !location){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user=await User.findOne({email:email});
        if(user){
            return res.status(409).json({message:"user already exist"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        newUser=await User.create({name,email,password:hashedPassword,role,location});
        
        const token=jwt.sign({id:newUser._id},process.env.JWT_TOKEN,{expiresIn:'1h'});
        
        const safeUser=newUser.toObject();
        delete safeUser.password;
        return res.status(200).json({message:"new user created",user:safeUser,token:token});

    }catch(err){
        console.error("signup Error:", err);
        return res.status(500).json({message:"error in signup"});
    }
}

module.exports={singup};