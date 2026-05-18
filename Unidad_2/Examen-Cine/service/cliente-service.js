const API = '';

const listarClientes = () =>
  fetch(`${API}/clientes`).then((response) => {
    if (!response.ok) throw new Error('Error al listar clientes');
    return response.json();
  });

const cliente = (id) =>
  fetch(`${API}/clientes/${id}`).then((response) => {
    if (!response.ok) throw new Error('Cliente no encontrado');
    return response.json();
  });

const crearCliente = (nombre, email, telefono) =>
  fetch(`${API}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, telefono })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al crear cliente');
    return response.json();
  });

const eliminarCliente = (id) =>
  fetch(`${API}/clientes/${id}`, { method: 'DELETE' }).then((response) => {
    if (!response.ok) throw new Error('Error al eliminar cliente');
    return response.json();
  });

const editarCliente = (id, nombre, email, telefono) =>
  fetch(`${API}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, telefono })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al editar cliente');
    return response.json();
  });

export const clienteService = {
  listarClientes,
  cliente,
  crearCliente,
  eliminarCliente,
  editarCliente
};
