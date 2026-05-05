/*
const listarMascotas = () =>
    fetch("http://localhost:3000/mascota")
        .then(respuesta => respuesta.json());

const crearMascota = (nombre, edad, raza, peso, duenoid) => {
    const id = crypto.randomUUID();
    return fetch("http://localhost:3000/mascota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, edad, raza, peso, duenoid })
    }).then(respuesta => respuesta.json());
};

const eliminarMascota = (id) =>
    fetch(`http://localhost:3000/mascota/${id}`, { method: "DELETE" });

const mascota = (id) =>
    fetch(`http://localhost:3000/mascota/${id}`)
        .then(respuesta => respuesta.json());

const editarMascota = (id, nombre, edad, raza, peso, duenoid) =>
    fetch(`http://localhost:3000/mascota/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, duenoid })
    }).then(respuesta => respuesta.json());

const obtenerDueno = (id) =>
    fetch(`http://localhost:3000/perfil/${id}`)
        .then(res => res.json());

export const mascotaService = {
    listarMascotas, crearMascota, eliminarMascota, mascota, editarMascota, obtenerDueno
};
*/


/*
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_KEY = "TU_ANON_PUBLIC_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const listarMascotas = async () => {
    const { data, error } = await supabase
        .from('mascotas').select('*').order('nombre');
    if (error) throw error;
    return data;
};

const crearMascota = async (nombre, edad, raza, peso, duenoid) => {
    const id = crypto.randomUUID();
    const { data, error } = await supabase
        .from('mascotas').insert([{ id, nombre, edad, raza, peso, duenoid }]).select();
    if (error) throw error;
    return data[0];
};

const eliminarMascota = async (id) => {
    const { error } = await supabase.from('mascotas').delete().eq('id', id);
    if (error) throw error;
    return true;
};

const mascota = async (id) => {
    const { data, error } = await supabase
        .from('mascotas').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

const editarMascota = async (id, nombre, edad, raza, peso, duenoid) => {
    const { data, error } = await supabase
        .from('mascotas').update({ nombre, edad, raza, peso, duenoid }).eq('id', id).select();
    if (error) throw error;
    return data[0];
};

const obtenerDueno = async (id) => {
    const { data, error } = await supabase
        .from('clientes').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

export const mascotaService = {
    listarMascotas, crearMascota, eliminarMascota, mascota, editarMascota, obtenerDueno
};
*/


/*
const API_BASE_URL    = "http://127.0.0.1/doguito_petshop/api/conexion_mascotas.php";
const API_CLIENTES_URL = "http://127.0.0.1/doguito_petshop/api/conexion.php";

const listarMascotas = () =>
    fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al listar mascotas");
            return response.json();
        });

const crearMascota = (nombre, edad, raza, peso, duenoid) => {
    const id = crypto.randomUUID();
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, edad, raza, peso, dueñoId: duenoid })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear mascota");
        return response.json();
    });
};

const eliminarMascota = (id) =>
    fetch(`${API_BASE_URL}?id=${id}`, { method: "DELETE" });

const mascota = (id) =>
    fetch(`${API_BASE_URL}?id=${id}`)
        .then(respuesta => respuesta.json());

const editarMascota = (id, nombre, edad, raza, peso, duenoid) =>
    fetch(API_BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, edad, raza, peso, dueñoId: duenoid })
    }).then(response => {
        if (!response.ok) throw new Error("Error al editar mascota");
        return response.json();
    });

const obtenerDueno = (id) =>
    fetch(`${API_CLIENTES_URL}?id=${id}`)
        .then(respuesta => respuesta.json());

export const mascotaService = {
    listarMascotas, crearMascota, eliminarMascota, mascota, editarMascota, obtenerDueno
};
*/
// Ajusta estas URLs a la ruta real de tus archivos PHP en XAMPP
const API_BASE_URL = "http://localhost:3001";

const listarMascotas = async () => {
    const response = await fetch(`${API_BASE_URL}/mascotas`);
    if (!response.ok) throw new Error("Error al listar mascotas");
    return response.json();
};

const mascota = async (id) => {
    const response = await fetch(`${API_BASE_URL}/mascotas/${id}`);
    if (!response.ok) throw new Error("Mascota no encontrada");
    return response.json();
};

const crearMascota = async (nombre, edad, raza, peso, duenoid) => {
    const id = crypto.randomUUID();
    const response = await fetch(`${API_BASE_URL}/mascotas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, edad, raza, peso, "dueñoId": duenoid })
    });
    if (!response.ok) throw new Error("Error al crear mascota");
    return response.json();
};

const editarMascota = async (id, nombre, edad, raza, peso, duenoid) => {
    const response = await fetch(`${API_BASE_URL}/mascotas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, "dueñoId": duenoid })
    });
    if (!response.ok) throw new Error("Error al editar mascota");
    return response.json();
};

const eliminarMascota = async (id) => {
    const response = await fetch(`${API_BASE_URL}/mascotas/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar mascota");
    return response.json();
};

const obtenerDueno = async (id) => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
    if (!response.ok) throw new Error("Dueño no encontrado");
    return response.json();
};

export const mascotaService = {
    listarMascotas,
    mascota,
    crearMascota,
    editarMascota,
    eliminarMascota,
    obtenerDueno
};