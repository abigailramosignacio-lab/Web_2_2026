document.getElementById('createPostForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const titulo = document.getElementById('postTitulo').value;
    const descripcion = document.getElementById('postDescripcion').value;
    
    const newPost = {
        titulo: titulo,
        descripcion: descripcion,
        fecha: new Date().toISOString()
    };
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newPost)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error estado: ${response.status}`);
        }
        
        const data = await response.json();
        showResult(data);
        
        document.getElementById('createPostForm').reset();
        
        setTimeout(() => {
            if (confirm('¿Deseas ver todos los posts actualizados?')) {
                getData();
            }
        }, 500);
        
    } catch (error) {
        showResult(error.message, true);
    }
});

document.getElementById('updatePostForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const id = document.getElementById('updateId').value;
    const titulo = document.getElementById('updateTitulo').value;
    const descripcion = document.getElementById('updateDescripcion').value;
    
    if (!id) {
        showResult('Por favor ingresa un ID válido', true);
        return;
    }
    
    const updateData = {
        titulo: titulo,
        descripcion: descripcion,
        fecha: new Date().toISOString()
    };
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(updateData)
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`No existe un post con ID: ${id}`);
            }
            throw new Error(`HTTP error estado: ${response.status}`);
        }
        
        const data = await response.json();
        showResult(data);
        
        document.getElementById('updatePostForm').reset();
        
        setTimeout(() => {
            if (confirm('¿Deseas ver todos los posts actualizados?')) {
                getData();
            }
        }, 500);
        
    } catch (error) {
        showResult(error.message, true);
    }
});