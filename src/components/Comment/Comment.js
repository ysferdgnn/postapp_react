import { Avatar, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import React from "react";
import './Comment.scss'

function Comment(props){


    const {comment}=props
    return (
        <div>

            <Card variant="outlined" className="comment-card">
                <CardHeader avatar={<Avatar>{comment.username.charAt(0)} </Avatar>} title={<Typography align="left">{comment.username}</Typography>}></CardHeader>
                <CardContent >
                    
                        <Paper elevation={0} align="left"  className="comment-text">{comment.text}</Paper>
                   
                </CardContent>
            </Card>
        </div>
    );
}

export default Comment;