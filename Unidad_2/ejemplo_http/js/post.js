const postData=()=>{
    const newPost={
        titulo:"nuevo post",
        descripcion:"es un nuevo post creado",
        fecha: new Date().toISOString()
    };
    fetch(API_URL,{
        method:"POST",
        Headers:{"Content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(newPost)
    })
    .then(Response=>{
        if(!Response.ok){
            throw new Error(`HTTP error estado: ${Response.status}`);
        }
        return Response.json();
    })
    .then(data=showResult(data))
    .catch(error.message,true);
}