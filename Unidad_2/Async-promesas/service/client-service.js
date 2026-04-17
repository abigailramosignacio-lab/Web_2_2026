const listarClientes = () => 
    fetch("http://localhost:3000/perfil")
    .then((respuesta) => respuesta.json());

const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/perfil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, id: uuidv4() })
    });
};

const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "DELETE"
    });
};

const cliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`)
    .then((respuesta) => respuesta.json());
};

const editarCliente = (nombre, email, id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email }) 
    })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

export const clientService = {
    listarClientes,
    crearCliente,
    eliminarCliente,
    cliente, 
    editarCliente,
};