const API = '';

const listarHorarios = () =>
  fetch(`${API}/horarios`).then((response) => {
    if (!response.ok) throw new Error('Error al listar horarios');
    return response.json();
  });

const horario = (id) =>
  fetch(`${API}/horarios/${id}`).then((response) => {
    if (!response.ok) throw new Error('Horario no encontrado');
    return response.json();
  });

const crearHorario = (salaId, peliculaId, inicio, precio) =>
  fetch(`${API}/horarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salaId, peliculaId, inicio, precio })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al crear horario');
    return response.json();
  });

const editarHorario = (id, salaId, peliculaId, inicio, precio) =>
  fetch(`${API}/horarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salaId, peliculaId, inicio, precio })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al editar horario');
    return response.json();
  });

const eliminarHorario = (id) =>
  fetch(`${API}/horarios/${id}`, { method: 'DELETE' }).then((response) => {
    if (!response.ok) throw new Error('Error al eliminar horario');
    return response.json();
  });

export const horarioService = {
  listarHorarios,
  horario,
  crearHorario,
  editarHorario,
  eliminarHorario
};
