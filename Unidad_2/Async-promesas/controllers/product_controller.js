import { productoService } from "../service/producto-service.js";

const crearFila = (nombre, precio, id) => {
    const fila = document.createElement("tr");
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${precio}</td>
        <td>
            <ul class="table__button-control">
                <li><a href="../screens/editar_producto.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
                <li><button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button></li>
            </ul>
        </td>`;
    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        productoService.eliminarProducto(btn.id).then(() => {
            alert("Producto eliminado");
            window.location.reload();
        }).catch(() => alert("Error"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");
productoService.listarProductos().then((data) => {
    data.forEach(({ nombre, precio, id }) => {
    table.appendChild(crearFila(nombre, precio, id));
    });
}).catch(() => alert("Error al cargar productos"));