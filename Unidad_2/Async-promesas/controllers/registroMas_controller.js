import { mascotaService } from "../service/mascota-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
const selectDueno = document.querySelector("[data-dueño-id]");

// Cargar clientes en el dropdown
clientService.listarClientes()
    .then((clientes) => {
        clientes.forEach(cliente => {
            const option = document.createElement("option");
            option.value = cliente.id;
            option.textContent = cliente.nombre;
            selectDueno.appendChild(option);
        });
    })
    .catch(() => alert("Error al cargar clientes"));

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoid = document.querySelector("[data-dueño-id]").value;

    mascotaService.crearMascota(nombre, edad, raza, peso, duenoid)
        .then(() => {
            window.location.href = "../screens/registro_acabado.html";
        })
        .catch((error) => {
            console.error("Error en el registro:", error);
            alert("Error al registrar: " + error.message);
        });
});