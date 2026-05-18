import { clienteService } from '../service/cliente-service.js';

const form = document.querySelector('[data-form]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  const email = document.querySelector('#email').value.trim();
  const telefono = document.querySelector('#telefono').value.trim();

  clienteService.crearCliente(nombre, email, telefono)
    .then(() => {
      alert('Cliente registrado');
      window.location.href = 'listar_clientes.html';
    })
    .catch(() => alert('Error al registrar cliente'));
});
