import {  Button, Card, CardContent,  InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom"
import PostService from "../../services/PostService"
import AuthService from "../../services/AuthService";
import SimpleSnackbar from "../Alert/SimpleSnackbar";
function PostForm(props) {

    const[title,setTitle] =useState("");
    const[text,setText]=useState("");
    const{usersId,refreshPosts}=props;
    const navigate = useNavigate();
    const [isSent,setIsSent]=useState(false);
    const [isError,setIsError]=useState(false);
    const [message,setMessage] =useState('');

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
                setIsError (true);
                setMessage("UnAuthorized Access");
                setIsSent(true);
            }
            if(res.status===200){
                
                setIsError (false);
                setMessage("Successfully Sent");
                setIsSent(true);
            }
            else{
                console.log("saved"); // fixme: popup
                setIsError (true);
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
    const onCloseSnackbar = ()=>{
        setIsSent(false);
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
            <SimpleSnackbar isSuccess={isSent} onCloseCallback={onCloseSnackbar} severity={isError ?"error" :"success"} message={message}></SimpleSnackbar>
        </div>
    );
}

export default PostForm;
