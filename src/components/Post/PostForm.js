import { Button, Card, CardContent,  InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";

function PostForm(props) {

    const[title,setTitle] =useState("");
    const[text,setText]=useState("");
     const{usersId,userName,refreshPosts}=props;

     const clearForm=()=>{
         setTitle("");
         setText("");
     }

    const savePost=()=>{
        fetch("/api/post",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    title:title,
                    usersId:usersId,
                    text:text
                }
            )
        })
        .then((res) => res.json)
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
