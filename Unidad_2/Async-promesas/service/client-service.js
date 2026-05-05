/*JSON
const listarClientes = () =>
    fetch("http://localhost:3000/perfil")
        .then(respuesta => respuesta.json());

const crearCliente = (nombre, email) => {
    const id = crypto.randomUUID();
    return fetch("http://localhost:3000/perfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, email })
    }).then(respuesta => respuesta.json());
};

const eliminarCliente = (id) =>
    fetch(`http://localhost:3000/perfil/${id}`, { method: "DELETE" });

const cliente = (id) =>
    fetch(`http://localhost:3000/perfil/${id}`)
        .then(respuesta => respuesta.json());

const editarCliente = (id, nombre, email) =>
    fetch(`http://localhost:3000/perfil/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    }).then(respuesta => respuesta.json());

export const clientService = {
    listarClientes, crearCliente, eliminarCliente, cliente, editarCliente
};
*/

/*SUPABASE
const SUPABASE_URL = "https://TU_PROYECTO.supabase.co";
const SUPABASE_KEY = "TU_ANON_PUBLIC_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const listarClientes = async () => {
    const { data, error } = await supabase
        .from('clientes').select('*').order('nombre');
    if (error) throw error;
    return data;
};

const crearCliente = async (nombre, email) => {
    const id = crypto.randomUUID();
    const { data, error } = await supabase
        .from('clientes').insert([{ id, nombre, email }]).select();
    if (error) throw error;
    return data[0];
};

const eliminarCliente = async (id) => {
    const { error } = await supabase.from('clientes').delete().eq('id', id);
    if (error) throw error;
    return true;
};

const cliente = async (id) => {
    const { data, error } = await supabase
        .from('clientes').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

const editarCliente = async (id, nombre, email) => {
    const { data, error } = await supabase
        .from('clientes').update({ nombre, email }).eq('id', id).select();
    if (error) throw error;
    return data[0];
};

export const clientService = {
    listarClientes, crearCliente, eliminarCliente, cliente, editarCliente
};
*/

/*
const API_BASE_URL = "http://127.0.0.1/doguito_petshop/api/conexion.php";

const listarClientes = () =>
    fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error("Error al listar clientes");
            return response.json();
        });

const crearCliente = (nombre, email) =>
    fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    }).then(response => {
        if (!response.ok) throw new Error("Error al crear cliente");
        return response.json();
    });

const eliminarCliente = (id) =>
    fetch(`${API_BASE_URL}?id=${id}`, { method: "DELETE" });

const cliente = (id) =>
    fetch(`${API_BASE_URL}?id=${id}`)
        .then(respuesta => respuesta.json());

const editarCliente = (id, nombre, email) =>
    fetch(`${API_BASE_URL}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    }).then(response => {
        if (!response.ok) throw new Error("Error al editar cliente");
        return response.json();
    });

export const clientService = {
    listarClientes, crearCliente, eliminarCliente, cliente, editarCliente
};
*/
const API_BASE_URL = "http://localhost:3001";

const listarClientes = async () => {
    const response = await fetch(`${API_BASE_URL}/clientes`);
    if (!response.ok) throw new Error("Error al listar clientes");
    return response.json();
};

const cliente = async (id) => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
    if (!response.ok) throw new Error("Cliente no encontrado");
    return response.json();
};

const crearCliente = async (nombre, email) => {
    const id = crypto.randomUUID();
    const response = await fetch(`${API_BASE_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, email })
    });
    if (!response.ok) throw new Error("Error al crear cliente");
    return response.json();
};

const editarCliente = async (id, nombre, email) => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email })
    });
    if (!response.ok) throw new Error("Error al editar cliente");
    return response.json();
};

const eliminarCliente = async (id) => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar cliente");
    return response.json();
};

export const clientService = {
    listarClientes,
    cliente,
    crearCliente,
    editarCliente,
    eliminarCliente
};