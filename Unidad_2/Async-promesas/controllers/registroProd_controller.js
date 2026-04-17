import { productoService } from "../service/producto-service.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    console.log("El botón fue presionado correctamente");

    // Obtener los valores del formulario
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;

    // Enviar los datos al servicio
    productoService.crearProducto(nombre, precio )
        .then((respuesta) => {
            console.log("Todo OK", respuesta);
            window.location.href = "../screens/registro_terminado.html";
        })
        .catch((error) => {
            console.error("Todo mal", error);
            alert("Ocurrió un error al registrar el producto.");
        });
});