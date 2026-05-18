import { salaService } from '../service/sala-service.js';

const form = document.querySelector('[data-form]');
const inputId = document.getElementById('sala-id');
const inputNombre = document.getElementById('nombre');
const inputCapacidad = document.getElementById('capacidad');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  alert('Sala no encontrada');
  window.location.href = 'listar_salas.html';
}

salaService.sala(id)
  .then((sala) => {
    inputId.value = sala.id;
    inputNombre.value = sala.nombre;
    inputCapacidad.value = sala.capacidad;
  })
  .catch(() => {
    alert('Error al cargar la sala');
    window.location.href = 'listar_salas.html';
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();

  salaService.editarSala(
    inputId.value,
    inputNombre.value.trim(),
    Number(inputCapacidad.value)
  )
    .then(() => {
      alert('Sala actualizada');
      window.location.href = 'listar_salas.html';
    })
    .catch(() => alert('Error al actualizar la sala'));
});
