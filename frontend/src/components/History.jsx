import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {LineChart,Tooltip,Line,Legend,CartesianGrid, XAxis, YAxis} from "recharts"
import "./History.css";

function History(){

    const {token,user}=useContext(AuthContext);
    const [data,setData]=useState([{}]);

    const fetchData=async()=>{
        try{
            const responce=await axios.post("http://localhost:8080/api/user/v1/getnearbydisasters",{
                address:user.location.address
                },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            console.log(responce.data.disasters);
            setData(responce.data.disasters);

        }catch(err){
            console.log("error in history component",err);
        }
    }

    useEffect(()=>{
         fetchData();
    },[]);


    return(
        <div className="history-div">
            <button onClick={fetchData}>Fetch</button>
            <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 25 }}>
                <CartesianGrid stroke="#aaa" strokeDasharray="6 6" />
                <Line type="monotone" dataKey="severity" stroke="purple" strokeWidth={2} name="Severity number" />
                <XAxis dataKey="date" />
                <YAxis width="auto" label={{ value: 'Severity', position: 'insideLeft', angle: -90 }} />
                <Tooltip/>
            </LineChart>
        </div>
    )
}

export default History;