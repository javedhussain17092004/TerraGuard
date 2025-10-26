import React,{useState} from "react";
import axios from "axios";
import { Link, replace, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "", // default value
    });
    const [address,setAddress]=useState("");
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const handleAddressChange=(e)=>{
        setAddress(e.target.value)
    }

    const handleOnChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmitForm=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const response=await axios.post("http://localhost:8080/api/user/v1/signup",{
                name:formData.name,
                email:formData.email,
                password:formData.password,
                role:formData.role,
                location:{
                    address:address,
                    coordinates:[0,0]
                }
            });

            console.log(response);

            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user));

            setLoading(true);
            navigate("/");
            window.location.reload();

        }catch(err){
            console.log("error in handle submit form",err);
        }
    }

    return(
        <div className="signup-form">
            <h1 style={{ marginLeft:"20rem", fontSize:"2rem" }}>Signup</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="name">Enter your name:</label><br></br>
                <input name="name" id="name" className="input-field" placeholder="Enter your name" value={formData.name} onChange={handleOnChange} required/><br></br><br></br>
            
                <label htmlFor="email">Enter your email:</label><br></br>
                <input name="email" id="email" className="input-field" placeholder="Enter your email" value={formData.email} onChange={handleOnChange} required/><br></br><br></br>
            
                <label htmlFor="password">Enter your password:</label><br></br>
                <input name="password" type="password" className="input-field" id="password" placeholder="Enter your password" value={formData.password} onChange={handleOnChange} required/><br></br><br></br>
            
                <label htmlFor="role">Enter your role:</label><br></br>
                <select value={formData.role} name="role" className="input-field" onChange={handleOnChange} required><br></br>
                    <option>Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select><br></br><br></br>
            
                <label htmlFor="location">Enter your location:</label><br></br>
                <input name="location" className="input-field" id="location" placeholder="Enter your location" value={address} onChange={handleAddressChange} required/><br></br><br></br>
            
                <button type="submit">{loading ? "Loading.." : "Signup"}</button><br></br><br></br>

                <p>Already have an account <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}