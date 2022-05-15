export default {
    deletePost  (postId) {
      let token = localStorage.getItem("tokenKey");
      fetch("/api/post/"+postId,{
          method: "DELETE",
          headers:{
            "Authorization":token
          }
      }
      
      ).then((res) => res.json)
      
      .catch((error) => console.log(error))
    },

    savePost (title,text,usersId){
      let token = localStorage.getItem("tokenKey");
      let request= fetch("/api/post",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":token
        },
        body:JSON.stringify(
            {
                title:title,
                usersId:usersId,
                text:text
            }
        )
      })
      return request;

    }



}