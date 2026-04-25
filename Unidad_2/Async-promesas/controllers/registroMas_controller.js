import { mascotaService } from "../service/mascota-service.js";

const formu = document.querySelector("[data-form]");

formu.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoid = document.querySelector("[data-dueño-id]").value;

    mascotaService.crearMascota(nombre, edad, raza, peso, duenoid)
        .then((respuesta) => {
            console.log("Todo OK", respuesta);
            window.location.href = "../screens/registro_acabado.html";
        })
        .catch((error) => {
            console.error("Todo mal", error);
            alert("Ocurrió un error al registrar la mascota.");
        });
});