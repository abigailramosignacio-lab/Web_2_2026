import { productoService } from "../service/producto-service.js";

const form = document.querySelector("[data-form]");

const InfoProd = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const precio = document.querySelector("[data-precio]");

    try {
        const producto = await productoService.producto(id);
        if (producto.nombre && producto.precio !== undefined) {
            nombre.value = producto.nombre;
            precio.value = producto.precio;
        } else {
            throw new Error("Datos incompletos");
        }
    } catch (error) {
        window.location.href = "../screens/error.html";
    }
}

InfoProd();

form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;

    try {
        // ID agregado aquí
        await productoService.editarProducto(id, nombre, precio);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (error) {
        alert("Ocurrió un error al editar el producto.");
    }
});