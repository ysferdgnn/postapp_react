import { Button, Card, CardContent, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import SimpleSnackbar from "../Alert/SimpleSnackbar";


function CommentForm(props) {

    const [isSent,setIsSent]=useState(false);
    const [isError,setIsError]=useState(false);
    const [comment,setComment] =useState("");
    const {postId,usersId,addCommentCallback,onCloseSnackbar} =props;
    const [message,setMessage] =useState('');
    const navigate = useNavigate();

    const handleComment=(value)=>{
        setComment(value);
    }

    const handleSubmit=async ()=>{
       const response = await fetch("/api/comment",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey")
            },
            body:JSON.stringify(
                {
                    usersId:usersId,
                    postId:postId,
                    text:comment
                }
            )
          });

        if(response.ok){
                
            setIsError (false);
            setMessage("Successfully Sent");
            setIsSent(true);
            addCommentCallback(await response.json());
        }
        else if(response.status===401){
            AuthService.refreshToken(navigate);
            setIsError (true);
            setMessage("UnAuthorized Access");
            setIsSent(true);
        }
        else{
            setIsError (true);
            setMessage("Error");
            setIsSent(true);
        }
         
       
    }


    return (
        <div>
            <Card variant="outlined" className="post-card">

            <CardContent>
            <Typography >Comment</Typography>
            <OutlinedInput id="outlined-basic" placeholder="comment"  multiline  sx={{margin: 'auto',minWidth:'90%'}} required
            onChange={(value) => handleComment(value.target.value)} value={comment}  />
            
            
            <Button variant="contained" onClick={handleSubmit}>Share!</Button>
            </CardContent>


            </Card>
            <SimpleSnackbar isSuccess={isSent} onCloseCallback={onCloseSnackbar} severity={isError ?"error" :"success"} message={message}></SimpleSnackbar>
        </div>
    );
}

export default CommentForm;