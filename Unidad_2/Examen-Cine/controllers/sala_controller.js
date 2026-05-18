import { salaService } from '../service/sala-service.js';

const crearFila = (nombre, capacidad, id) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${capacidad}</td>
    <td>
      <ul class="table__button-control">
        <li><a href="editar_sala.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
        <li><button class="simple-button simple-button--delete" type="button" data-id="${id}">Eliminar</button></li>
      </ul>
    </td>
  `;

  fila.querySelector('[data-id]').addEventListener('click', () => {
    if (!confirm('¿Eliminar esta sala?')) return;
    salaService.eliminarSala(id)
      .then(() => window.location.reload())
      .catch(() => alert('Error al eliminar la sala'));
  });

  return fila;
};

const table = document.querySelector('[data-table]');

salaService.listarSalas()
  .then((data) => {
    data.forEach(({ nombre, capacidad, id }) => {
      table.appendChild(crearFila(nombre, capacidad, id));
    });
  })
  .catch(() => alert('Error al cargar salas'));
