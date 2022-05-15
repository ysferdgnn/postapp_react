import { Button, Card, CardContent,  InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom"
import PostService from "../../services/PostService"
import AuthService from "../../services/AuthService";
function PostForm(props) {

    const[title,setTitle] =useState("");
    const[text,setText]=useState("");
    const{usersId,refreshPosts}=props;
    const navigate = useNavigate();

     const clearForm=()=>{
         setTitle("");
         setText("");
     }
     

    const savePost=()=>{

        PostService.savePost(title,text,usersId)
        .then((res) => 
        {
            if(res.status===401){
                AuthService.refreshToken(navigate);
            }
            else{
                console.log("saved"); // fixme: popup
            }
        }
        
        
        )       
        .catch((error) => console.log(error));
    }
    const handleSubmit=() =>{
        savePost();
        clearForm();
        refreshPosts();

    }

    const handleTitle=(value)=>{
        setTitle(value);
    }
    const handleText = (value)=>{
        setText(value);
    }

    return (
        <div>
            <Card variant="outlined" className="post-card">

            <CardContent>
            <Typography >Post something!</Typography>
            <OutlinedInput id="outlined-basic" placeholder="title"  multiline fullWidth margin="dense" required
            onChange={(value) => handleTitle(value.target.value)} value={title}  />
            
            <OutlinedInput id="outlined-basic" placeholder="text"  multiline fullWidth margin="dense" required value={text}
             endAdornment={
                 
                <InputAdornment position="end">
                    <Button variant="contained" onClick={handleSubmit}>Share!</Button>
                </InputAdornment>
            }
            onChange={
                (value)=> handleText(value.target.value)
            }></OutlinedInput>
            </CardContent>


            </Card>
        </div>
    );
}

export default PostForm;
