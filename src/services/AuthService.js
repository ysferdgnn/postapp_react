export default {


     refreshToken (navigator,callback){
        let token = localStorage.getItem("refreshToken");
        let user = localStorage.getItem("currentUser");
         fetch("/api/auth/refresh",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify( {
                usersId: user,
                refreshToken: token
            })
        }
        
        ).then((res) => {
            console.log("response status: "+res.status);
            if(res.status===401)
            {
                localStorage.clear();
                navigator(0);
                
            }else{
               return  res.json();
            }
        })
        .then((responsebody) =>  {
            localStorage.setItem("tokenKey",responsebody.message) 
            callback();
        })
        
        .catch((error) => console.log(error))
    }

    
}