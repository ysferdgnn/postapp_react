import { Close, ExpandMore, LineStyle } from "@mui/icons-material";
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
import SimpleSnackbar from "../Alert/SimpleSnackbar";
import AuthService from "../../services/AuthService";
import {useNavigate } from "react-router-dom"
import CommentForm from "../Comment/CommentForm";


function Post(props) {

    const [expanded, setExpanded] = React.useState(false);
    const[isLiked,setIsliked] =useState(false);
    const [comments,setComments]=useState([]);
    const {post,usersId,refreshCallback} = props;
    const [isSent,setIsSent]=useState(false);
    const navigate = useNavigate();
    const [isError,setIsError]=useState(false);
    const [message,setMessage] =useState('');
    const [likesCount,setLikesCount] = useState('');
    

    useEffect(()=>{
       var postLike = post.likes.find(like => like.usersId ==usersId);
       setLikesCount(post.likes.length)
        if(postLike){
            setIsliked(true);
        }
       
    },[]);

    useEffect(()=>{       
        setLikesCount(post.likes.length)
        
        
     },[post]);



    const getAllComments=()=>{
        fetch("/api/comment/postId="+post.id,
        {
            headers:{
                "Authorization" : localStorage.getItem("tokenKey")
            }
        })
        .then(response=> {
            if(response.status===401){
                AuthService.refreshToken(navigate,getAllComments);
               
               return []
          }else{
             return response.json()
          }
        })
        .then(data => {
            setComments(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            setComments([]);
        });
    }

    const handleExpandClick = () => {
        if(!expanded){
            getAllComments();
        }
        setExpanded(!expanded);
        
    };
    

    

    const saveLike=()=>{
        fetch("/api/likes/changelikes",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem("tokenKey")
            },
            body:JSON.stringify(
                {
                    usersId: usersId,
                    postId:post.id
                }
            )
        })
        .then((response) => {
            if(response.status===401){
                AuthService.refreshToken(navigate);
                setMessage("UnAuthorized Access");

            }
            if(response.status===200){
                 refreshCallback();
            }
        })
        
        
        .catch((error) => console.log(error))
    }



    const handleLike = ()=>{
        setIsliked(!isLiked);
        saveLike();

    }

    const deletePost= ()=>{
        PostService.deletePost(post.id)
        .then((res) => {
            if(res.status===401){
                AuthService.refreshToken(navigate);
                setIsError(true);
                setMessage("UnAuthorized Access");
                setIsSent(true);

            }
            if(res.status===200){
                setIsError(false);
                setMessage("Successfully Deleted");
                setIsSent(true);
                refreshCallback();
            }
            else{
                console.log("saved"); // fixme: popup
            }
        })
      
      .catch((error) => console.log(error))
    }
    const onCloseSnackbar = ()=>{
        setIsSent(false);
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
                         <IconButton  onClick={deletePost}>
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
                    <Typography >{likesCount}</Typography>
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
                            <CommentForm usersId = {localStorage.getItem("currentUser")} postId={post.id} refreshCallback={getAllComments} onCloseCallback={onCloseSnackbar}></CommentForm>
                            {comments.map((comment,index) => (
                                <Comment key={index} comment={comment} ></Comment>
                                
                            
                            ))}
                        </div>
                      
                        
                    </CardContent>
                </Collapse>
            </Card>
            <SimpleSnackbar isSuccess={isSent} onCloseCallback={onCloseSnackbar} message={message}></SimpleSnackbar>

        </div>


    );


}


export default Post;
