import { Close, ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite'
import PostService from "../../services/PostService";
import {
    CardHeader,
    Card,
    CardContent,
    Typography,
    
    Avatar,
    CardActions,
    Collapse
} from "@mui/material";
import React, { useEffect, useState } from "react";
import './Post.scss'
import Comment from "../Comment/Comment";



function Post(props) {

    const [expanded, setExpanded] = React.useState(false);
    const[isLiked,setIsliked] =useState(false);
    const [comments,setComments]=useState([]);
    const {post,usersId} = props;
    
    useEffect(()=>{
       var postLike = post.likes.filter(like => like.usersId === usersId);

    },[]);




    const getAllComments=(postId)=>{
        fetch("/api/comment/postId="+postId)
        .then(res=> res.json)
        .then(data => setComments(data))
        .catch((error) => {
            console.log(error);
            setComments([]);
        });
    }

    const handleExpandClick = () => {
        if(expanded){
            getAllComments(post.id);
        }
        setExpanded(!expanded);
        
    };
    

    

    const saveLike=()=>{
        fetch("/api/likes",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:{
                usersId: usersId,
                postId:post.id
            }
        })
        .then((response) => response.json)
        .catch((error) => console.log(error))
    }



    const handleLike = ()=>{
        setIsliked(!isLiked);
        saveLike();

    }

    return (
        <div>
            <Card variant="outlined" className="post-card">
                <CardHeader title={
                        post.title
                    }
                    avatar={
                        <Avatar>R</Avatar>
                     }
                     action={
                         <IconButton  onClick={()=>{PostService.deletePost(post.id)}}>
                             <Close ></Close>
                         </IconButton>
                     }
                    
                >
                    
                </CardHeader>
                <CardContent>
                    <Typography sx={{textAlign:"left"}}>
                     {post.text }

                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleLike} >
                    <FavoriteIcon style={ isLiked ? {color:"red"} :null}/>
                    </IconButton>
                   
                    <ExpandMore 
                    
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    className="post-card-expand-more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded}
                    timeout="auto"
                    unmountOnExit>
                    <CardContent>                       
                        <div>
                           
                            {comments.map((comment,index) => (
                                <Comment key={index} comment={comment} ></Comment>
                                
                            
                            ))}
                        </div>
                      
                        
                    </CardContent>
                </Collapse>
            </Card>

        </div>


    );


}


export default Post;
