import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar(){
    const {token,logout}=useContext(AuthContext);
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        navigate("/login");
    }


    return(
        <div className="navbar">
            <div><button className="home" onClick={()=>navigate("/")}>Home</button></div>
            {!token ? (
            <div >
                <button className="auth" onClick={()=>navigate("/login")}>Login</button>
                <button className="auth" onClick={()=>navigate("/signup")}>Signup</button>
            </div>
            ) : (
            <div>
                <Link to="/profile" style={{marginRight:"1rem", backgroundColor:"aqua", borderRadius:"15px", fontSize:"1.5rem"}}><i className="fa-solid fa-user"></i></Link>
                <button className="auth" onClick={()=>navigate("/dashboard")}>Dashboard</button>
                <button className="auth" onClick={()=>navigate("/history")}>History</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            )}
            
        </div>
    )
}