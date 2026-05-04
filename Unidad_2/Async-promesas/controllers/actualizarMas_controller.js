import { clientService } from "../service/client_service.js";

const formu = document.querySelector("[data-form]");
const url = new URL(window.location);
const id = url.searchParams.get("id");

if (!id) {
    window.location.href = "../screens/error.html";
}

const InfoMas = async () => {
    const nombre = document.querySelector("[data-nombre]");
    const edad = document.querySelector("[data-edad]");
    const raza = document.querySelector("[data-raza]");
    const peso = document.querySelector("[data-peso]");
    const duenoid = document.querySelector("[data-dueño-id]");

    try {
        const mascota = await mascotaService.mascota(id);
        if (mascota.nombre !== undefined && mascota.duenoid !== undefined) {
            nombre.value = mascota.nombre;
            edad.value = mascota.edad;
            raza.value = mascota.raza;
            peso.value = mascota.peso;
            duenoid.value = mascota.duenoid;
        } else {
            throw new Error("Datos incompletos");
        }
    } catch (error) {
        console.error("Error al obtener mascota:", error);
        window.location.href = "../screens/error.html";
    }
};

formu.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoid = document.querySelector("[data-dueño-id]").value;

    try {
        await mascotaService.editarMascota(id, nombre, edad, raza, peso, duenoid);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (error) {
        console.error("Error al actualizar mascota:", error);
        alert("Ocurrió un error al editar la mascota.");
    }
});

InfoMas();