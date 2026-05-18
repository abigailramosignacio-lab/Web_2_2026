import { horarioService } from '../service/horario-service.js';

const crearFila = (peliculaTitulo, salaNombre, inicio, precio, id) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${peliculaTitulo}</td>
    <td>${salaNombre}</td>
    <td>${inicio}</td>
    <td>${Number(precio).toFixed(2)}</td>
    <td>
      <ul class="table__button-control">
        <li><a href="editar_horario.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
        <li><button class="simple-button simple-button--delete" type="button" data-id="${id}">Eliminar</button></li>
      </ul>
    </td>
  `;

  fila.querySelector('[data-id]').addEventListener('click', () => {
    if (!confirm('¿Eliminar este horario?')) return;
    horarioService.eliminarHorario(id)
      .then(() => window.location.reload())
      .catch(() => alert('Error al eliminar el horario'));
  });

  return fila;
};

const table = document.querySelector('[data-table]');

horarioService.listarHorarios()
  .then((data) => {
    data.forEach(({ peliculaTitulo, salaNombre, inicio, precio, id }) => {
      table.appendChild(crearFila(peliculaTitulo, salaNombre, inicio, Number(precio), id));
    });
  })
  .catch(() => alert('Error al cargar horarios'));
