import React,{useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const { token, user, authLoading } = useContext(AuthContext);
    if (authLoading) {
        return <div>Loading...</div>; 
    }
    if(!token || !user){
        return <Navigate to="/Login" replace/>
    }
    return children;
}