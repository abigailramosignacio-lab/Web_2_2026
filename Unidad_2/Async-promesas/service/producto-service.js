/*
const listarProductos = () =>
    fetch("http://localhost:3000/producto")
        .then(respuesta => respuesta.json());

const crearProducto = (nombre, precio) => {
    const id = crypto.randomUUID();
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, precio })
    }).then(respuesta => {
        if (!respuesta.ok) throw new Error("Error al crear");
        return respuesta.json();
    });
};

const eliminarProducto = (id) =>
    fetch(`http://localhost:3000/producto/${id}`, { method: "DELETE" });

const productoDetalle = (id) =>
    fetch(`http://localhost:3000/producto/${id}`)
        .then(respuesta => respuesta.json());

const editarProducto = (id, nombre, precio) =>
    fetch(`http://localhost:3000/producto/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio })
    }).then(respuesta => respuesta.json());

export const productoService = {
    listarProductos, crearProducto, eliminarProducto, productoDetalle, editarProducto
};
*/


// ============================================================
// OPCIÓN 2 · SUPABASE  (sin backend, directo desde el browser)
// Requiere: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// ============================================================
/*
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_KEY = "TU_ANON_PUBLIC_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const listarProductos = async () => {
    const { data, error } = await supabase
        .from('productos').select('*').order('nombre');
    if (error) throw error;
    return data;
};

const crearProducto = async (nombre, precio) => {
    const id = crypto.randomUUID();
    const { data, error } = await supabase
        .from('productos').insert([{ id, nombre, precio }]).select();
    if (error) throw error;
    return data[0];
};

const eliminarProducto = async (id) => {
    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (error) throw error;
    return true;
};

const productoDetalle = async (id) => {
    const { data, error } = await supabase
        .from('productos').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

const editarProducto = async (id, nombre, precio) => {
    const { data, error } = await supabase
        .from('productos').update({ nombre, precio }).eq('id', id).select();
    if (error) throw error;
    return data[0];
};

export const productoService = {
    listarProductos, crearProducto, eliminarProducto, productoDetalle, editarProducto
};
*/


// ============================================================
// OPCIÓN 3 · MYSQL + PHP  (XAMPP / WAMP, api/conexion_productos.php)
// Requiere: XAMPP corriendo, archivo api/conexion_productos.php en htdocs
// ============================================================
/*
const API_BASE_URL = "http://127.0.0.1/doguito_petshop/api/conexion_productos.php";

const listarProductos = () =>
    fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al listar productos");
            return response.json();
        });

const crearProducto = (nombre, precio) => {
    const id = crypto.randomUUID();
    return fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, precio })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear producto");
        return response.json();
    });
};

const eliminarProducto = (id) =>
    fetch(`${API_BASE_URL}?id=${id}`, { method: "DELETE" });

const productoDetalle = (id) =>
    fetch(`${API_BASE_URL}?id=${id}`)
        .then(respuesta => respuesta.json());

const editarProducto = (id, nombre, precio) =>
    fetch(API_BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, precio })
    }).then(response => {
        if (!response.ok) throw new Error("Error al editar producto");
        return response.json();
    });

export const productoService = {
    listarProductos, crearProducto, eliminarProducto, productoDetalle, editarProducto
};
*/


// ============================================================
// OPCIÓN 4 · SQL via Node.js + Express  (backend-doguito)
// Requiere: cd backend-doguito && node server.js  (puerto 3001)
// ============================================================

const API_BASE_URL = "http://localhost:3001";

const listarProductos = () =>
    fetch(`${API_BASE_URL}/productos`)
        .then(response => {
            if (!response.ok) throw new Error("Error al listar productos");
            return response.json();
        });

const crearProducto = (nombre, precio) => {
    const id = crypto.randomUUID();
    return fetch(`${API_BASE_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, precio })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear producto");
        return response.json();
    });
};

const eliminarProducto = (id) =>
    fetch(`${API_BASE_URL}/productos/${id}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar producto");
            return response.json();
        });

const productoDetalle = (id) =>
    fetch(`${API_BASE_URL}/productos/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Producto no encontrado");
            return response.json();
        });

const editarProducto = (id, nombre, precio) =>
    fetch(`${API_BASE_URL}/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio })
    }).then(response => {
        if (!response.ok) throw new Error("Error al editar producto");
        return response.json();
    });

export const productoService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    productoDetalle,
    editarProducto
};
