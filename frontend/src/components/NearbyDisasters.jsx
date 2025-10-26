import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./NearbyDisasters.css";

function NearbyDisasters({ onResults }){
    const {token}=useContext(AuthContext);
    const [nearbyDisasters,setNearbyDisasters]=useState();
    const [address,setAddress]=useState("");
    const [loading,setLoading]=useState(false);

    const handleNearbyDisastersForm=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const response=await axios.post("http://localhost:8080/api/user/v1/getnearbydisasters",{
                address:address
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            console.log(response.data.disasters);
            onResults(response.data.disasters || []);
            setLoading(false);
        }catch(err){
            console.log("error in nearby disaters form fetch",err);
        }
    }

    return(
        <form onSubmit={(e)=>handleNearbyDisastersForm(e)}>
            <label htmlFor="location" className="Label-field">Enter your Location:</label><br></br>
            <input placeholder="Enter your location" className="input-field" name="location" id="location" value={address} onChange={(e)=>setAddress(e.target.value)} required/><br></br><br></br>
            <button type="submit">{loading ? "Loading..." : "Search"}</button>
        </form>
    );
}

export default NearbyDisasters;