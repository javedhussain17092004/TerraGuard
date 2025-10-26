const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const express=require("express");
const mongoose=require("mongoose");
const User=require("../models/user.js");

const logIn=async(req,res)=>{
    const {email,password,role}=req.body;
    try{
        if (!email || !password || !role){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:"Invaqlid creadentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(404).json({message:"Invaqlid creadentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_TOKEN,{expiresIn:'1h'});

        const safeUser=user.toObject();
        delete safeUser.password;
        return res.status(200).json({message:"user logedIn",user:safeUser,token:token});

    }catch(err){
        console.error("Login Error:", err);
        return res.status(500).json({message:"error in login"});
    }
}

module.exports={logIn};