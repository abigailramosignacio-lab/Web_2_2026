import { salaService } from '../service/sala-service.js';

const form = document.querySelector('[data-form]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  const capacidad = Number(document.querySelector('#capacidad').value);

  salaService.crearSala(nombre, capacidad)
    .then(() => {
      alert('Sala registrada');
      window.location.href = 'listar_salas.html';
    })
    .catch(() => alert('Error al registrar sala'));
});
