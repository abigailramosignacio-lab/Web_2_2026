/*-----CON JSON-SERVER
const listarProductos = () => 
    fetch("http://localhost:3000/producto")
    .then((respuesta) => respuesta.json());

const crearProducto = (nombre, precio) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, precio })
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
*/


/*-----CON SUPABASE
const URL_SUPABASE = 'https://xytdkyfzjndfgxphtbbe.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0hnAMtyevUJgAo8LKuRv8A_F64yQKak';
const table = 'productos';
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

const listarProductos = () => request(`${API_URL}?select=id,nombre,precio&order=id.asc`);
const productoDetalle = (id) => request(`${API_URL}?id=eq.${id}&select=id,nombre,precio`)
    .then(data => {
        if (!data || data.length === 0) throw new Error('Producto no encontrado');
        return data[0];
    });
const crearProducto = (nombre, precio) => request(API_URL, {
    method: 'POST',
    body: JSON.stringify({ nombre, precio })
}).then(data => data?.[0]);
const editarProducto = (id, nombre, precio) => request(`${API_URL}?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ nombre, precio })
}).then(data => {
    if (!data || data.length === 0) throw new Error('No se pudo editar');
    return data[0];
});
const eliminarProducto = (id) => request(`${API_URL}?id=eq.${id}`, {
    method: 'DELETE'
}).then(data => {
    if (!data || data.length === 0) throw new Error('No se pudo eliminar');
    return data;
});
*/


// -----CON MYSQL Y PHP (ACTIVA)
const API_BASE_URL = 'http://127.0.0.1/API/conPro.php';

const listarProductos = () => {
    return fetch(API_BASE_URL).then(response => {
        if (!response.ok) throw new Error('Error al listar productos');
        return response.json();
    });
};

const crearProducto = (nombre, precio) => {
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio })
    }).then(response => {
        if (!response.ok) throw new Error('Error al crear producto');
        return response.json();
    });
};

const eliminarProducto = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`, { method: "DELETE" });
};

const editarProducto = (id, nombre, precio) => {
    return fetch(`${API_BASE_URL}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio })
    }).then(response => {
        if (!response.ok) throw new Error('Error al editar producto');
        return response.json();
    });
};

const productoDetalle = (id) => {
    return fetch(`${API_BASE_URL}?id=${id}`)
        .then(respuesta => respuesta.json());
};

export const productoService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    productoDetalle,
    editarProducto
};

