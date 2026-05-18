import { horarioService } from '../service/horario-service.js';

const form = document.querySelector('[data-form]');
const inputId = document.getElementById('horario-id');
const selectPelicula = document.getElementById('peliculaId');
const selectSala = document.getElementById('salaId');
const inputInicio = document.getElementById('inicio');
const inputPrecio = document.getElementById('precio');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const cargarOpciones = async () => {
  const [peliculas, salas] = await Promise.all([
    fetch('/peliculas').then((r) => r.json()),
    fetch('/salas').then((r) => r.json())
  ]);

  selectPelicula.innerHTML = peliculas.map((p) => `<option value="${p.id}">${p.titulo}</option>`).join('');
  selectSala.innerHTML = salas.map((s) => `<option value="${s.id}">${s.nombre}</option>`).join('');
};

if (!id) {
  alert('Horario no encontrado');
  window.location.href = 'listar_horarios.html';
}

Promise.all([cargarOpciones(), horarioService.horario(id)])
  .then(([, horario]) => {
    inputId.value = horario.id;
    selectPelicula.value = horario.peliculaId;
    selectSala.value = horario.salaId;
    inputInicio.value = horario.inicio;
    inputPrecio.value = horario.precio;
  })
  .catch(() => {
    alert('Error al cargar horario');
    window.location.href = 'listar_horarios.html';
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const peliculaId = Number(selectPelicula.value);
  const salaId = Number(selectSala.value);
  const inicio = inputInicio.value;
  const precio = Number(inputPrecio.value);

  horarioService.editarHorario(id, salaId, peliculaId, inicio, precio)
    .then(() => {
      alert('Horario actualizado');
      window.location.href = 'listar_horarios.html';
    })
    .catch(() => alert('Error al actualizar horario'));
});
