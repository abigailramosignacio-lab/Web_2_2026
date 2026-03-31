const deleteData=()=>{
    fetch(`${API_URL}/1`,{
        method:"delete"
    }).then(responce=>{
        if(!response.ok){
            throw new Error (`HTTP error! estado: ${response.status}`);
        }
        showResult({
        message:"Post con el iod 1 eliminado",
        status:response.status
        });

    })
    .catch(error=>(error.message,true));
}