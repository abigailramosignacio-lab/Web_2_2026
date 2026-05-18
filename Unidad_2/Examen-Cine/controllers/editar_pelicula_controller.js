import { peliculaService } from '../service/pelicula-service.js';

const form = document.querySelector('[data-form]');
const inputId = document.getElementById('pelicula-id');
const inputTitulo = document.getElementById('titulo');
const inputDuracion = document.getElementById('duracion');
const inputGenero = document.getElementById('genero');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  alert('Película no encontrada');
  window.location.href = 'listar_peliculas.html';
}

peliculaService.pelicula(id)
  .then((pelicula) => {
    inputId.value = pelicula.id;
    inputTitulo.value = pelicula.titulo;
    inputDuracion.value = pelicula.duracion;
    inputGenero.value = pelicula.genero;
  })
  .catch(() => {
    alert('Error al cargar la película');
    window.location.href = 'listar_peliculas.html';
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();

  peliculaService.editarPelicula(
    inputId.value,
    inputTitulo.value.trim(),
    inputDuracion.value.trim(),
    inputGenero.value.trim()
  )
    .then(() => {
      alert('Película actualizada');
      window.location.href = 'listar_peliculas.html';
    })
    .catch(() => alert('Error al actualizar la película'));
});
