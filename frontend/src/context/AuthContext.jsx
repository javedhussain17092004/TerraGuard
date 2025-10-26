import React,{useState,useEffect,createContext} from "react";
import { Navigate } from "react-router-dom";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [token,setToken]=useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(()=>{
        const savetoken=localStorage.getItem("token");
        const saveUser=JSON.parse(localStorage.getItem("user"));
        if(saveUser && savetoken){
            setToken(savetoken);
            setUser(saveUser);
        }
        setAuthLoading(false);
    },[]);

    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };


    return(
        <AuthContext.Provider value={{token,user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}