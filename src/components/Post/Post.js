import { Close, ExitToAppSharp, ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
    CardHeader,
    Card,
    CardContent,
    Typography,
    
    Avatar,
    CardActions,
    Collapse
} from "@mui/material";
import React, { useState } from "react";
import './Post.scss'
import { pink, red } from "@mui/material/colors";
import { color } from "@mui/system";


function Post(props) {

    const [expanded, setExpanded] = React.useState(false);
    const[isLiked,setIsliked] =useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const {post,usersId} = props;

    const deletePost = () =>{
        fetch("/api/post/"+post.id,{
            method: "DELETE"
        }
        
        ).then((res) => res.json)
        .catch((error) => console.log(error))
    }

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
                         <IconButton onClick={deletePost}>
                             <Close ></Close>
                         </IconButton>
                     }
                    
                >
                    
                </CardHeader>
                <CardContent>

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
                        <Typography paragraph>
                        {post.text }
                        </Typography>
                      
                        
                    </CardContent>
                </Collapse>
            </Card>

        </div>


    );


}


export default Post;
