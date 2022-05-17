import { Alert, Snackbar } from "@mui/material";
import {React,useState} from "react";
export default function SimpleSnackbar(props){

    const vertical="top"
    const horizontal="right"
   
    const isSuccess=props.isSuccess;
    const onCloseCallback = props.onCloseCallback;
    const severity =props.severity ? props.severity:"success"
    const message = props.message;

    

    return (
        <Snackbar onClose={onCloseCallback}  open={isSuccess} autoHideDuration={2000} 
        anchorOrigin={{ vertical, horizontal }} key={vertical+horizontal}>
           <Alert onClose={onCloseCallback}  severity={severity} sx={{ width: '100%' }} >
               {message} 
           </Alert>


        </Snackbar>
    )
}