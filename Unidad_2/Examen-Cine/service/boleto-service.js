const API = '';

const listarBoletos = () =>
  fetch(`${API}/boletos`).then((response) => {
    if (!response.ok) throw new Error('Error al listar boletos');
    return response.json();
  });

const boleto = (id) =>
  fetch(`${API}/boletos/${id}`).then((response) => {
    if (!response.ok) throw new Error('Boleto no encontrado');
    return response.json();
  });

const crearBoleto = (clienteId, horarioId, asiento, precio, fechaCompra) =>
  fetch(`${API}/boletos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clienteId, horarioId, asiento, precio, fechaCompra })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al crear boleto');
    return response.json();
  });

const editarBoleto = (id, clienteId, horarioId, asiento, precio, fechaCompra) =>
  fetch(`${API}/boletos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clienteId, horarioId, asiento, precio, fechaCompra })
  }).then((response) => {
    if (!response.ok) throw new Error('Error al editar boleto');
    return response.json();
  });

const eliminarBoleto = (id) =>
  fetch(`${API}/boletos/${id}`, { method: 'DELETE' }).then((response) => {
    if (!response.ok) throw new Error('Error al eliminar boleto');
    return response.json();
  });

export const boletoService = {
  listarBoletos,
  boleto,
  crearBoleto,
  editarBoleto,
  eliminarBoleto
};
