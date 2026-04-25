import { mascotaService } from "../service/mascota-service.js";

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
    const duenold = document.querySelector("[data-dueño-id]");

    try {
        const mascota = await mascotaService.mascota(id);
        if (mascota.nombre !== undefined && mascota.duenold !== undefined) {
            nombre.value = mascota.nombre;
            edad.value = mascota.edad;
            raza.value = mascota.raza;
            peso.value = mascota.peso;
            duenold.value = mascota.duenold;
        } else {
            throw new Error("Datos incompletos");
        }
    } catch (error) {
        console.error("Error:", error);
        window.location.href = "../screens/error.html";
    }
};

InfoMas();

formu.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenold = document.querySelector("[data-dueño-id]").value;

    try {
        await mascotaService.editarMascota(id, nombre, edad, raza, peso, duenold);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Ocurrió un error al editar la mascota.");
    }
});