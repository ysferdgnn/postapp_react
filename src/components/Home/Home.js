import React from "react";
import Post from "../Post/Post";
import { useState,useEffect } from "react";
import PostForm from "../Post/PostForm";
import {useNavigate } from "react-router-dom"
import { CircularProgress, Snackbar } from "@mui/material";
import AuthService from "../../services/AuthService";


function Home(){
    let usersId = localStorage.getItem("currentUser");
    const navigate = useNavigate();

    const[posts,setPosts]=useState([]);
    const[isLoaded,setIsLoaded]=useState(false);
    const[isError,setIsError]=useState(false);


    const  refreshPosts=async ()=>{
        console.log("refreshed");
         fetch('/api/post',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey")
            }
        })
        .then(response => {
            if(response.status===401){
                  AuthService.refreshToken(navigate,refreshPosts);
                 
                 return []
            }else{
               return response.json()
            }
        })
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
           
        },[]);


        if(isError){
            return (
                <div>HATA VARR</div>
            );
        }else if(!isLoaded){
            return(
                <CircularProgress />
            );
        }else {

            if(posts.length <1){
                return(
                    <div>
                        <PostForm usersId={usersId} refreshPosts={refreshPosts}></PostForm>
                    </div>
                )
            }else{

           


            return (
               <div>
                    <PostForm usersId={usersId} refreshPosts={refreshPosts}></PostForm>
                     {
                         
                        posts.map((postmap,index) => (
                            <Post key={index} post={postmap} usersId={usersId} refreshCallback={refreshPosts}></Post>
                            
                        
                        ))
                        
                    }
                    
                    
               </div>
                
            ) }}
        }




    


export default Home;
