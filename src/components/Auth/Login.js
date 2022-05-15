import {  Button, FormControl, FormHelperText, Input, TextField } from "@mui/material";

import React, { useState } from "react";
import {useNavigate } from "react-router-dom"

function Login(){


    const[username,setUsername ] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername=(username)=>{
        setUsername(username);
    }
    const handlePassword = (password) =>{
        setPassword(password);
    }

    const handleRegister=()=>{

        console.log(username);
        console.log(password);

        fetch("/api/auth/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    username:username,
                    password:password,
                    
                }
            )
        })
        .then((res) => res.json)
        .catch((error) => console.log(error));

        navigate(0);
        
    }

    const handleLogin =()=>{
        fetch("/api/auth/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    username:username,
                    password:password
                }
            )
        })
        .then((response) => response.json())
        .then((result)=> {
            console.log(result);
            localStorage.setItem("tokenKey",result.message);
            localStorage.setItem("refreshToken",result.refreshToken);
            localStorage.setItem("currentUser",result.usersId);
            navigate(0);
        })
        .catch((error) => console.log(error))

    }

    return(

        <FormControl sx={{marginTop:30}}>

            <TextField placeholder="Username" autoFocus={true} onChange={(i)=> handleUsername(i.target.value)}></TextField>
      
            <TextField placeholder="Password" onChange={(i) => handlePassword(i.target.value)}></TextField>

            <Button variant="contained" onClick={handleRegister}>Register</Button>
            <FormHelperText>Are you already registered?</FormHelperText>
            <Button variant="contained" style={{marginTop:10}} onClick={handleLogin}>Login</Button>
        </FormControl>


    );
}

export default Login;