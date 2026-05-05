import { productoService } from "../service/producto-service.js";

const formProd = document.querySelector("[data-form]");

const cargarDatosProducto = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }

    const nombreInput = document.querySelector("[data-nombre]");
    const precioInput = document.querySelector("[data-precio]");

    try {
        const producto = await productoService.producto(id);
        if (producto.nombre && producto.precio !== undefined) {
            nombreInput.value = producto.nombre;
            precioInput.value = producto.precio;
        } else {
            throw new Error("Datos de producto no encontrados");
        }
    } catch (error) {
        console.error("Error:", error);
        window.location.href = "../screens/error.html";
    }
};

cargarDatosProducto();

formProd.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value.trim();
    const precio = document.querySelector("[data-precio]").value.trim();

    try {
        await productoService.editarProducto(id, nombre, precio);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (error) {
        alert("Ocurrió un error al editar el producto.");
    }
});