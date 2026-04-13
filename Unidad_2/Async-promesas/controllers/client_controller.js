import { clientService } from "../service/client-service.js";

const crearFila = (nombre, email, id) => {
    const fila = document.createElement("tr");

    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}"
                       class="simple-button simple-button--edit">
                        Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete"
                            type="button"
                            id="${id}">
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;

    fila.innerHTML = contenido;

    // Botón eliminar
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        clientService.eliminarCliente(id)
            .then(() => {
                alert("El cliente fue eliminado");
                window.location.reload();
            })
            .catch(() => {
                alert("Error al eliminar el cliente");
            });
    });

    return fila;
};

const table = document.querySelector("[data-table]");

// Listar clientes
clientService.listarClientes()
    .then((data) => {
        data.forEach((cliente) => {
            const nuevaFila = crearFila(
                cliente.nombre,
                cliente.email,
                cliente.id
            );
            table.appendChild(nuevaFila);
        });
    })
    .catch(() => {
        alert("Error al cargar los clientes");
    });
