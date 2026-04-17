const listarMascotas = () => 
    fetch("http://localhost:3000/mascota")
    .then((respuesta) => respuesta.json());

const crearMascota = (nombre, edad, raza, peso, dueñoId) => {
    return fetch("http://localhost:3000/mascota", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, edad, raza, peso, dueñoId, id: uuidv4() })
    });
};

const eliminarMascota = (id) => {
    return fetch(`http://localhost:3000/mascota/${id}`, {
        method: "DELETE"
    });
};

const mascota = (id) => {
    return fetch(`http://localhost:3000/mascota/${id}`)
    .then((respuesta) => respuesta.json());
};

const editarMascota = (id, nombre, edad, raza, peso, dueñoId) => {
    return fetch(`http://localhost:3000/mascota/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, edad, raza, peso, dueñoId })
    })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

const obtenerDueño = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`)
        .then(res => res.json());
};

export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    mascota,
    editarMascota,
    obtenerDueño
};