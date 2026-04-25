/*-----CON JSON-SERVER
const listarMascotas = () => 
    fetch("http://localhost:3000/mascota")
    .then((respuesta) => respuesta.json());

const crearMascota = (nombre, edad, raza, peso, duenoid) => {
    return fetch("http://localhost:3000/mascota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, duenoid })
    });
};

const eliminarMascota = (id) => {
    return fetch(`http://localhost:3000/mascota/${id}`, { method: "DELETE" });
};

const mascota = (id) => {
    return fetch(`http://localhost:3000/mascota/${id}`)
        .then((respuesta) => respuesta.json());
};

const editarMascota = (id, nombre, edad, raza, peso, duenoid) => {
    return fetch(`http://localhost:3000/mascota/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, duenoid })
    }).then((respuesta) => respuesta).catch((err) => console.log(err));
};

const obtenerDueno = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`)
        .then(res => res.json());
};
*/


/*-----CON SUPABASE
const URL_SUPABASE = 'https://xytdkyfzjndfgxphtbbe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0hnAMtyevUJgAo8LKuRv8A_F64yQKak';
const table = 'mascotas';
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

const request = async (url, option = {}) => {
    try {
        const res = await fetch(url, {
            ...option,
            headers: { ...HEADERS, ...option.headers }
        });
        if (res.status === 204) return null;
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (!res.ok) {
            const mensaje = data?.message ?? data?.hint ?? text ?? 'Error desconocido';
            throw new Error(mensaje);
        }
        return data;
    } catch (error) {
        console.error("Error de conexión/red:", error.message);
        throw error;
    }
};

const listarMascotas = () => request(`${API_URL}?select=id,nombre,raza,edad,peso,duenoid&order=id.asc`);
const mascota = (id) => request(`${API_URL}?id=eq.${id}&select=id,nombre,raza,edad,peso,duenoid`)
    .then(data => {
        if (!data || data.length === 0) throw new Error('Mascota no encontrada');
        return data[0];
    });
const crearMascota = (nombre, edad, raza, peso, duenoid) => request(API_URL, {
    method: 'POST',
    body: JSON.stringify({ nombre, edad, raza, peso, duenoid })
}).then(data => data?.[0]);
const editarMascota = (id, nombre, edad, raza, peso, duenoid) => request(`${API_URL}?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ nombre, edad, raza, peso, duenoid })
}).then(data => {
    if (!data || data.length === 0) throw new Error('No se pudo editar');
    return data[0];
});
const eliminarMascota = (id) => request(`${API_URL}?id=eq.${id}`, {
    method: 'DELETE'
}).then(data => {
    if (!data || data.length === 0) throw new Error('No se pudo eliminar');
    return data;
});
const obtenerDueno = (id) => request(`${URL_SUPABASE}/rest/v1/clientes?id=eq.${id}&select=id,nombre,email`)
    .then(data => {
        if (!data || data.length === 0) throw new Error('Dueño no encontrado');
        return data[0];
    });
*/


// -----CON MYSQL Y PHP (ACTIVA)
const API_BASE_URL = 'http://127.0.0.1/API/conMas.php';

const listarMascotas = () => {
    return fetch(API_BASE_URL).then(response => {
        if (!response.ok) throw new Error('Error mascotas');
        return response.json();
    });
};

const crearMascota = (nombre, edad, raza, peso, duenoid) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, duenoid })
    }).then(response => {
        if (!response.ok) throw new Error('Error crear mascota');
        return response.json();
    });
};

const eliminarMascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, { method: "DELETE" });
};

const editarMascota = (id, nombre, edad, raza, peso, duenoid) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, duenoid })
    }).then(response => {
        if (!response.ok) throw new Error('Error al editar mascota');
        return response.json();
    });
};

const mascota = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(respuesta => respuesta.json());
};

const obtenerDueno = (id) => {
    return fetch(`http://127.0.0.1/API/conexion.php?id=${id}`)
        .then(respuesta => respuesta.json());
};

export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    mascota,
    editarMascota,
    obtenerDueno
};