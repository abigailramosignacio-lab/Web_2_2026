import { productoService } from "../service/producto-service.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    // 1. Es buena práctica limpiar los espacios en blanco de los bordes
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const precio = document.querySelector("[data-precio]").value.trim();

    // 2. Validación básica antes de enviar
    if (nombre === "" || precio === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    console.log("Enviando producto:", { nombre, precio });

    // Enviar los datos al servicio
    productoService.crearProducto(nombre, precio)
        .then((respuesta) => {
            console.log("Producto registrado con éxito", respuesta);
            // Asegúrate de que esta ruta exista en tus carpetas
            window.location.href = "../screens/registro_terminado.html";
        })
        .catch((error) => {
    // Esto te dirá si el error es de red o si el PHP mandó algo mal
    console.dir(error); 
    alert("Error real: " + error.message);
});
});