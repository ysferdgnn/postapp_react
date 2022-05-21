import { Avatar, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import React from "react";


function Comment(props){


    const {comment}=props
    return (
        <div>
            <Paper elevation={0} sx={{marginTop:2}} variant="outlined">
                {comment.text}
            </Paper>
        </div>
    );
}

export default Comment;