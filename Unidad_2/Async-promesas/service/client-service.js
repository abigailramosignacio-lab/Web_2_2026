/*const listarClientes = () => 
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
};*/

/*-----CON SUPABASE
const URL_SUPABASE = 'https://xytdkyfzjndfgxphtbbe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0hnAMtyevUJgAo8LKuRv8A_F64yQKak';
const table = 'clientes';
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation' // Obliga a Supabase a devolver el objeto afectado
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
            // Supabase devuelve errores en la propiedad "message"
            const mensaje = data?.message ?? data?.hint ?? text ?? 'Error desconocido';
            console.error(`Error en la petición [${res.status}]:`, mensaje);
            throw new Error(mensaje);
        }

        return data;
    } catch (error) {
        console.error("Error de conexión/red:", error.message);
        throw error;
    }
}

// --- SERVICIOS ---

// GET - Listar todos
const listarClientes = () => {
    return request(`${API_URL}?select=id,nombre,email&order=id.asc`);
};

// GET POR ID - Obtener uno solo
const cliente = (id) => {
    return request(`${API_URL}?id=eq.${id}&select=id,nombre,email`)
        .then(data => {
            if (!data || data.length === 0) throw new Error('Cliente no encontrado');
            return data[0];
        });
};

// POST - Crear
const crearCliente = (nombre, email) => {
    return request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ nombre, email })
    }).then(data => data?.[0]);
};

//PATCH - Editar 
const editarCliente = (id, nombre, email) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, email })
    }).then(data => {
        if (!data || data.length === 0) throw new Error('No se pudo editar: el ID no existe o falta permiso RLS');
        return data[0];
    });
};


// DELETE - Eliminar
const eliminarCliente = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE'
    }).then(data => {
        if (!data || data.length === 0) throw new Error('No se pudo eliminar');
        return data;
    });
};*/

// -----CON MYSQL Y PHP
const API_BASE_URL = 'http://127.0.0.1/API/conexion.php';

const listarClientes = () => {
    return fetch(API_BASE_URL).then(response => {
        if (!response.ok) throw new Error('Error clientes');
        return response.json();
    });
};

const crearCliente = (nombre, email) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    }).then(response => {
        if (!response.ok) throw new Error('Error crear cliente');
        return response.json();
    });
};

const eliminarCliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, { method: "DELETE" });
};

const editarCliente = (id, nombre, email) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    }).then(response => {
        if (!response.ok) throw new Error('Error al editar');
        return response.json();
    });
};

const cliente = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(respuesta => respuesta.json());
};

export const clientService = {
    listarClientes,
    crearCliente,
    eliminarCliente,
    editarCliente,
    cliente
};