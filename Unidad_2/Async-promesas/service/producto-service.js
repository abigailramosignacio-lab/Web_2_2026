const listarProductos = () => 
    fetch("http://localhost:3000/producto")
    .then((respuesta) => respuesta.json());

const crearProducto = (nombre, precio) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, precio, id: uuidv4() })
    })
    .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error al crear");
        return respuesta.json();
    });
};

const eliminarProducto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "DELETE"
    });
};

const producto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`)
    .then((respuesta) => respuesta.json());
};

const editarProducto = (id, nombre, precio) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, precio })
    })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

export const productoService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    producto,
    editarProducto,
};