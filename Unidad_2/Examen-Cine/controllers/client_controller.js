import { clienteService } from '../service/cliente-service.js';

const crearFila = (nombre, email, telefono, id) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${email}</td>
    <td>${telefono}</td>
    <td>
      <ul class="table__button-control">
        <li><a href="editar_cliente.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
        <li><button class="simple-button simple-button--delete" type="button" data-id="${id}">Eliminar</button></li>
      </ul>
    </td>
  `;

  const btnEliminar = fila.querySelector('[data-id]');
  btnEliminar.addEventListener('click', () => {
    const idEliminar = btnEliminar.dataset.id;
    if (!confirm('¿Eliminar este cliente?')) return;

    clienteService.eliminarCliente(idEliminar)
      .then(() => window.location.reload())
      .catch(() => alert('Error al eliminar el cliente'));
  });

  return fila;
};

const table = document.querySelector('[data-table]');

clienteService.listarClientes()
  .then((data) => {
    data.forEach(({ nombre, email, telefono, id }) => {
      table.appendChild(crearFila(nombre, email, telefono, id));
    });
  })
  .catch(() => alert('Error al cargar datos'));
