import { Button, Card, CardContent, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import SimpleSnackbar from "../Alert/SimpleSnackbar";


function CommentForm(props) {

    const [isSent,setIsSent]=useState(false);
    const [isError,setIsError]=useState(false);
    const [comment,setComment] =useState("");
    const {postId,usersId,refreshCallback,onCloseSnackbar} =props;
    const [message,setMessage] =useState('');
    const navigate = useNavigate();

    const handleComment=(value)=>{
        setComment(value);
    }

    const handleSubmit=()=>{
        fetch("/api/comment",{
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
          }).then((response)=>{
            if(response.status===401){
                AuthService.refreshToken(navigate);
                setIsError (true);
                setMessage("UnAuthorized Access");
                setIsSent(true);
            }
            if(response.status===200){
                
                setIsError (false);
                setMessage("Successfully Sent");
                setIsSent(true);
                refreshCallback();
            }
            else{
                console.log("saved"); // fixme: popup
                setIsError (true);
            }
        })
    }


    return (
        <div>
            <Card variant="outlined" className="post-card">

            <CardContent>
            <Typography >Comment</Typography>
            <OutlinedInput id="outlined-basic" placeholder="comment"  multiline fullWidth margin="dense" required
            onChange={(value) => handleComment(value.target.value)} value={comment}  />
            
            
            <Button variant="contained" onClick={handleSubmit}>Share!</Button>
            </CardContent>


            </Card>
            <SimpleSnackbar isSuccess={isSent} onCloseCallback={onCloseSnackbar} severity={isError ?"error" :"success"} message={message}></SimpleSnackbar>
        </div>
    );
}

export default CommentForm;