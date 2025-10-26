import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export default function Login(){

    const {login}=useContext(AuthContext);

    const [formData,setFormData]=useState({email:"",password:"",role:""});
    const [showPassword,setShowPassword]=useState(false);
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();
    

    const handleShow=()=>{
        setShowPassword(!showPassword);
    }

    const handleOnChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleLoginForm=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const response=await axios.post("http://localhost:8080/api/user/v1/login",{
                email:formData.email,
                password:formData.password,
                role:formData.role
            });

            console.log(response.data);
            login(response.data.token, response.data.user);

            setLoading(false);
            navigate("/");

        }catch(err){
            console.log("error in handle login form",err);
        }
    }

    return(
        <div className="logIn-form">
            <h1 style={{ marginLeft:"20rem" }}>Login</h1>
            <form onSubmit={handleLoginForm}>
                <label htmlFor="email" className="Label-field">Enter your Email:</label><br></br>
                <input placeholder="Enter your Email" name="email" id="email" className="input-field" value={formData.email} onChange={(e)=>handleOnChange(e)} required/><br></br><br></br>
            
                <label htmlFor="password" className="Label-field">Enter your password:</label><br></br>
                <input placeholder="Enter your password" className="input-field" type={!showPassword?"password":"text"} name="password" id="password" value={formData.password} onChange={(e)=>handleOnChange(e)} required/><span onClick={handleShow}>{!showPassword?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}</span><br></br><br></br>

                <select value={formData.role} name="role" onChange={(e)=>handleOnChange(e)}  className="input-field">
                    <option>select role</option>
                    <option value="user" >User</option>
                    <option value="admin" >Admin</option>
                </select><br></br><br></br>

                <button type="submit" >{loading?"Loading":"Login"}</button><br></br>
                <p>Dont't have an Account <Link to="/signup" >Signup</Link></p>

            </form>
        </div>
    );
}