const express=require("express");
const mongoose=require("mongoose");
const User=require("../models/user.js");

const profile=async(req,res)=>{
    const id=req.user.id;
    try{
        const user=await User.findById(id).select("-password");
        if(!user){
            res.status(404).json({message:"user not found"});
        }
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"error in profile fetching"});
    }
}

module.exports=profile;