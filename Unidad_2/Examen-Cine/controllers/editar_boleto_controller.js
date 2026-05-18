import { boletoService } from '../service/boleto-service.js';

const form = document.querySelector('[data-form]');
const inputId = document.getElementById('boleto-id');
const selectCliente = document.getElementById('clienteId');
const selectHorario = document.getElementById('horarioId');
const inputAsiento = document.getElementById('asiento');
const inputPrecio = document.getElementById('precio');
const inputFechaCompra = document.getElementById('fechaCompra');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const cargarOpciones = async () => {
  const [clientes, horarios] = await Promise.all([
    fetch('/clientes').then((r) => r.json()),
    fetch('/horarios').then((r) => r.json())
  ]);

  selectCliente.innerHTML = clientes.map((c) => `<option value="${c.id}">${c.nombre}</option>`).join('');
  selectHorario.innerHTML = horarios.map((h) => `<option value="${h.id}">${h.peliculaTitulo} - ${h.salaNombre} (${h.inicio})</option>`).join('');
};

if (!id) {
  alert('Boleto no encontrado');
  window.location.href = 'listar_boletos.html';
}

Promise.all([cargarOpciones(), boletoService.boleto(id)])
  .then(([, boleto]) => {
    inputId.value = boleto.id;
    selectCliente.value = boleto.clienteId;
    selectHorario.value = boleto.horarioId;
    inputAsiento.value = boleto.asiento;
    inputPrecio.value = boleto.precio;
    inputFechaCompra.value = boleto.fechaCompra;
  })
  .catch(() => {
    alert('Error al cargar boleto');
    window.location.href = 'listar_boletos.html';
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const clienteId = Number(selectCliente.value);
  const horarioId = Number(selectHorario.value);
  const asiento = inputAsiento.value.trim();
  const precio = Number(inputPrecio.value);
  const fechaCompra = inputFechaCompra.value;

  boletoService.editarBoleto(id, clienteId, horarioId, asiento, precio, fechaCompra)
    .then(() => {
      alert('Boleto actualizado');
      window.location.href = 'listar_boletos.html';
    })
    .catch(() => alert('Error al actualizar boleto'));
});
