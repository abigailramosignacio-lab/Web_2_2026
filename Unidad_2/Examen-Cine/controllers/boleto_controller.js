import { boletoService } from '../service/boleto-service.js';

const crearFila = (clienteNombre, horarioInicio, peliculaTitulo, salaNombre, asiento, precio, fechaCompra, id) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${clienteNombre}</td>
    <td>${horarioInicio}</td>
    <td>${peliculaTitulo}</td>
    <td>${salaNombre}</td>
    <td>${asiento}</td>
    <td>${Number(precio).toFixed(2)}</td>
    <td>${fechaCompra}</td>
    <td>
      <ul class="table__button-control">
        <li><a href="editar_boleto.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
        <li><button class="simple-button simple-button--delete" type="button" data-id="${id}">Eliminar</button></li>
      </ul>
    </td>
  `;

  fila.querySelector('[data-id]').addEventListener('click', () => {
    if (!confirm('¿Eliminar este boleto?')) return;
    boletoService.eliminarBoleto(id)
      .then(() => window.location.reload())
      .catch(() => alert('Error al eliminar el boleto'));
  });

  return fila;
};

const table = document.querySelector('[data-table]');

boletoService.listarBoletos()
  .then((data) => {
    data.forEach(({ clienteNombre, horarioInicio, peliculaTitulo, salaNombre, asiento, precio, fechaCompra, id }) => {
      table.appendChild(crearFila(clienteNombre, horarioInicio, peliculaTitulo, salaNombre, asiento, Number(precio), fechaCompra, id));
    });
  })
  .catch(() => alert('Error al cargar boletos'));
