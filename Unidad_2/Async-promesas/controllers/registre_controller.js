import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;

    // Enviar los datos al servicio
    clientService.crearCliente(nombre, email)
        .then((respuesta) => {
            console.log("Todo OK", respuesta);
            window.location.href = "../screens/registro_completado.html";
        })
        .catch((error) => {
            console.error("Todo mal", error);
            alert("Ocurrió un error al registrar el cliente.");
        });
});