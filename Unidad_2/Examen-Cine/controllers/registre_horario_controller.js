import { horarioService } from '../service/horario-service.js';

const form = document.querySelector('[data-form]');
const selectPelicula = document.getElementById('peliculaId');
const selectSala = document.getElementById('salaId');

const cargarOpciones = async () => {
  const [peliculas, salas] = await Promise.all([
    fetch('/peliculas').then((r) => r.json()),
    fetch('/salas').then((r) => r.json())
  ]);

  selectPelicula.innerHTML = peliculas.map((p) => `<option value="${p.id}">${p.titulo}</option>`).join('');
  selectSala.innerHTML = salas.map((s) => `<option value="${s.id}">${s.nombre}</option>`).join('');
};

cargarOpciones().catch(() => alert('Error al cargar opciones'));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const peliculaId = Number(selectPelicula.value);
  const salaId = Number(selectSala.value);
  const inicio = document.getElementById('inicio').value;
  const precio = Number(document.getElementById('precio').value);

  horarioService.crearHorario(salaId, peliculaId, inicio, precio)
    .then(() => {
      alert('Horario registrado');
      window.location.href = 'listar_horarios.html';
    })
    .catch(() => alert('Error al registrar horario'));
});
