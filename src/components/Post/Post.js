import { CardHeader,Card,CardContent,Typography } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import './Post'
function Post(){

    const[posts,setPosts]=useState([]);
    const[isLoaded,setIsLoaded]=useState(false);
    const[isError,setIsError]=useState(false);

    useEffect(()=>{
        console.log('veri çekiyorum');
        fetch('/api/post')
        .then(response => response.json())
        .then(
            (data)=> {
            setPosts(data);
            setIsLoaded(true);
            setIsError(false);
            },
            (error)=>{
                setIsError(true);
                setIsLoaded(true);
                setPosts([]);
                console.log(error)
            })
        },[]);



    if(isError){
        return (
            <div>HATA VARR</div>
        );
    }else if(!isLoaded){
        return(
            <div>Yükleniyor!!</div>
        );
    }else {
        return (
            <div>
                {
                    posts.map((post,index) => (
                        <Card key={index} className='post-card' variant="outlined">
                        <CardContent>
                            
                            <CardHeader title={post.title}>
                                
                            </CardHeader>

                            <Typography >
                                {post.text}
                            </Typography>
                        </CardContent>               
                        </Card>
                        
                        
                    ))
                }

            </div>
        );
    }

}


export default Post;