import { peliculaService } from '../service/pelicula-service.js';

const crearFila = (titulo, duracion, genero, id) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${titulo}</td>
    <td>${duracion}</td>
    <td>${genero}</td>
    <td>
      <ul class="table__button-control">
        <li><a href="editar_pelicula.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
        <li><button class="simple-button simple-button--delete" type="button" data-id="${id}">Eliminar</button></li>
      </ul>
    </td>
  `;

  fila.querySelector('[data-id]').addEventListener('click', () => {
    const idEliminar = id;
    if (!confirm('¿Eliminar esta película?')) return;

    peliculaService.eliminarPelicula(idEliminar)
      .then(() => window.location.reload())
      .catch(() => alert('Error al eliminar la película'));
  });

  return fila;
};

const table = document.querySelector('[data-table]');

peliculaService.listarPeliculas()
  .then((data) => {
    data.forEach(({ titulo, duracion, genero, id }) => {
      table.appendChild(crearFila(titulo, duracion, genero, id));
    });
  })
  .catch(() => alert('Error al cargar películas'));
