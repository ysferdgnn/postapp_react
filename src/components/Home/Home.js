import React from "react";
import Post from "../Post/Post";
import { useState,useEffect } from "react";
import PostForm from "../Post/PostForm";
import { CircularProgress } from "@mui/material";
function Home(){
    let usersId = 2;


    const[posts,setPosts]=useState([]);
    const[isLoaded,setIsLoaded]=useState(false);
    const[isError,setIsError]=useState(false);


    const refreshPosts=()=>{
        // console.log('veri çekiyorum');
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
    }


    useEffect(()=>{
          
        refreshPosts();
           
        },[posts]);


        if(isError){
            return (
                <div>HATA VARR</div>
            );
        }else if(!isLoaded){
            return(
                <CircularProgress />
            );
        }else {
            return (
               <div>
                    <PostForm usersId={usersId} refreshPosts={refreshPosts}></PostForm>
                    {posts.map((postmap,index) => (
                        <Post key={index} post={postmap} usersId={usersId}></Post>
                        
                      
                    ))}
               </div>
                
            )}
        }




    


export default Home;
