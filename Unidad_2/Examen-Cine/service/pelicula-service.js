const API = '';

const listarPeliculas = () =>
  fetch(`${API}/peliculas`).then((response) => {
    if (!response.ok) throw new Error('Error al listar películas');
    return response.json();
  });

const pelicula = (id) =>
  fetch(`${API}/peliculas/${id}`).then((response) => {
    if (!response.ok) throw new Error('Película no encontrada');
    return response.json();
  });

const crearPelicula = (titulo, duracion, genero) =>
  fetch(`${API}/peliculas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, duracion, genero })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al crear película');
    return response.json();
  });

const editarPelicula = (id, titulo, duracion, genero) =>
  fetch(`${API}/peliculas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, duracion, genero })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al editar película');
    return response.json();
  });

const eliminarPelicula = (id) =>
  fetch(`${API}/peliculas/${id}`, { method: 'DELETE' }).then((response) => {
    if (!response.ok) throw new Error('Error al eliminar película');
    return response.json();
  });

export const peliculaService = {
  listarPeliculas,
  pelicula,
  crearPelicula,
  editarPelicula,
  eliminarPelicula
};
