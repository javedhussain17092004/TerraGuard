import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Profile(){

    const {user}=useContext(AuthContext)

    return(
        <div className="profile-container">
            <h1 style={{textAlign:"center"}}>Profile</h1>
            <div>
                <label htmlFor="name">Enter your name:</label><br></br>
                <input name="name" id="name" className="input-field" placeholder="Enter your name" value={user.name} onChange={()=>{}}/><br></br><br></br>
            
                <label htmlFor="email">Enter your email:</label><br></br>
                <input name="email" id="email" className="input-field" placeholder="Enter your email"  value={user.email} onChange={()=>{}} /><br></br><br></br>
            
                <label htmlFor="role">Enter your role:</label><br></br>
                <input name="role" className="input-field" id="role" placeholder="Enter your password" value={user.role} onChange={()=>{}} /><br></br><br></br>
                <br></br>
                <label htmlFor="location">Enter your location:</label><br></br>
                <input name="location" className="input-field" id="location" placeholder="Enter your location" value={user.location.address} onChange={()=>{}} /><br></br><br></br>
            </div>
        </div>
    )
}