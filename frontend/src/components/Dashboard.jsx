import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useEffect,useState } from "react";
import "./Dashboard.css";
import "leaflet/dist/leaflet.css";
import { AuthContext } from "../context/AuthContext";
import NearbyDisasters from "./NearbyDisasters";


function Dashboard(){
    const {token}=useContext(AuthContext);
    const [disasters,setDisasters]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchDiasters=async()=>{
        try{
            setLoading(true);
            const response=await axios.get("http://localhost:8080/api/user/v1/fetchdisaster",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            setDisasters(response.data.response || []);
            console.log(response);
            setLoading(false);
        }catch(err){
            console.log("error in fetchdisasters component",err);
        }
    }

    useEffect(()=>{
        fetchDiasters();
    },[]);

    return(
        <div className="Disaster-dashboard" style={{marginBottom:"10rem"}}>
            <h1>Disaster dashboard</h1>
            <div className="map-container">
                <NearbyDisasters onResults={setDisasters}/>
                {loading?<p>Loading..</p>:null}
                <div style={{color:"white"}} className="table-container">
                    <table >
                        <caption><h1>List of Disasters</h1></caption>
                        <thead>
                            <tr>
                                <th rowSpan={1}>Type</th>
                                <th rowSpan={1}>Severity</th>
                                <th rowSpan={1}>Date</th>
                                <th rowSpan={1}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disasters.map((d, idx) => (
                                <tr key={idx}>
                                    <td>{d.type}</td>
                                    <td>{d.severity}</td>
                                    <td>{new Date(d.date).toLocaleDateString()}</td>
                                    <td>{d.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="map" >
                    <MapContainer
                        center={
                            disasters.length
                                ? [disasters[0].location.coordinates[1], disasters[0].location.coordinates[0]]
                                : [0, 0]
                        }
                        zoom={5}
                        style={{ height: "500px", width: "100%" }}
                    >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {disasters.map((d, idx) => (
                        <Marker
                            key={idx}
                            position={[d.location.coordinates[1], d.location.coordinates[0]]}
                        >
                            <Popup>
                            {d.type} <br />
                            Severity: {d.severity} <br />
                            Date: {new Date(d.date).toLocaleDateString()} <br />
                            {d.description}
                            </Popup>
                        </Marker>
                    ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;