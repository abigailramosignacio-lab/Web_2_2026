import { peliculaService } from '../service/pelicula-service.js';

const form = document.querySelector('[data-form]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const titulo = document.querySelector('#titulo').value.trim();
  const duracion = document.querySelector('#duracion').value.trim();
  const genero = document.querySelector('#genero').value.trim();

  peliculaService.crearPelicula(titulo, duracion, genero)
    .then(() => {
      alert('Película registrada');
      window.location.href = 'listar_peliculas.html';
    })
    .catch(() => alert('Error al registrar película'));
});
