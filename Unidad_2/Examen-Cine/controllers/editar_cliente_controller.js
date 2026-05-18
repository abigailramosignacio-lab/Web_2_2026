import { clienteService } from '../service/cliente-service.js';

const form = document.querySelector('[data-form]');
const inputId = document.getElementById('cliente-id');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputTelefono = document.getElementById('telefono');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  alert('Cliente no encontrado');
  window.location.href = 'listar_clientes.html';
}

clienteService.cliente(id)
  .then((cliente) => {
    inputId.value = cliente.id;
    inputNombre.value = cliente.nombre;
    inputEmail.value = cliente.email;
    inputTelefono.value = cliente.telefono;
  })
  .catch(() => {
    alert('No se pudo cargar el cliente');
    window.location.href = 'listar_clientes.html';
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();

  clienteService.editarCliente(
    inputId.value,
    inputNombre.value.trim(),
    inputEmail.value.trim(),
    inputTelefono.value.trim()
  )
    .then(() => {
      alert('Cliente actualizado');
      window.location.href = 'listar_clientes.html';
    })
    .catch(() => alert('Error al actualizar cliente'));
});
