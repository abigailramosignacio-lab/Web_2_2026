import { productoService } from "../service/producto-service.js";

const crearFila = (nombre, precio, id) => {
    const fila = document.createElement("tr");
    const contenido = `
        <td class="td">${nombre}</td>
        <td>Bs. ${precio}</td>
        <td>
            <ul class="table__button-control">
                <li><a href="../screens/editar_producto.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
                <li><button class="simple-button simple-button--delete" type="button" data-id="${id}">Eliminar</button></li>
            </ul>
        </td>`;
    fila.innerHTML = contenido;

    fila.querySelector("button").addEventListener("click", (evento) => {
        const id = evento.target.dataset.id;
        productoService.eliminarProducto(id).then(() => {
            alert("Producto eliminado");
            window.location.reload();
        }).catch(() => alert("Error al eliminar"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");
productoService.listarProductos().then((data) => {
    data.forEach(prod => {
        table.appendChild(crearFila(prod.nombre, prod.precio, prod.id));
    });
}).catch(() => alert("Error al cargar productos"));