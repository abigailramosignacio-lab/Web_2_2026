const API = '';

const listarSalas = () =>
  fetch(`${API}/salas`).then((response) => {
    if (!response.ok) throw new Error('Error al listar salas');
    return response.json();
  });

const sala = (id) =>
  fetch(`${API}/salas/${id}`).then((response) => {
    if (!response.ok) throw new Error('Sala no encontrada');
    return response.json();
  });

const crearSala = (nombre, capacidad) =>
  fetch(`${API}/salas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, capacidad })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al crear sala');
    return response.json();
  });

const editarSala = (id, nombre, capacidad) =>
  fetch(`${API}/salas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, capacidad })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al editar sala');
    return response.json();
  });

const eliminarSala = (id) =>
  fetch(`${API}/salas/${id}`, { method: 'DELETE' }).then((response) => {
    if (!response.ok) throw new Error('Error al eliminar sala');
    return response.json();
  });

export const salaService = {
  listarSalas,
  sala,
  crearSala,
  editarSala,
  eliminarSala
};
