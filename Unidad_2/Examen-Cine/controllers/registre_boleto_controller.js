import { boletoService } from '../service/boleto-service.js';

const form = document.querySelector('[data-form]');
const selectCliente = document.getElementById('clienteId');
const selectHorario = document.getElementById('horarioId');

const cargarOpciones = async () => {
  const [clientes, horarios] = await Promise.all([
    fetch('/clientes').then((r) => r.json()),
    fetch('/horarios').then((r) => r.json())
  ]);

  selectCliente.innerHTML = clientes.map((c) => `<option value="${c.id}">${c.nombre}</option>`).join('');
  selectHorario.innerHTML = horarios.map((h) => `<option value="${h.id}">${h.peliculaTitulo} - ${h.salaNombre} (${h.inicio})</option>`).join('');
};

cargarOpciones().catch(() => alert('Error al cargar opciones'));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const clienteId = Number(selectCliente.value);
  const horarioId = Number(selectHorario.value);
  const asiento = document.getElementById('asiento').value.trim();
  const precio = Number(document.getElementById('precio').value);
  const fechaCompra = document.getElementById('fechaCompra').value;

  boletoService.crearBoleto(clienteId, horarioId, asiento, precio, fechaCompra)
    .then(() => {
      alert('Boleto registrado');
      window.location.href = 'listar_boletos.html';
    })
    .catch(() => alert('Error al registrar boleto'));
});
