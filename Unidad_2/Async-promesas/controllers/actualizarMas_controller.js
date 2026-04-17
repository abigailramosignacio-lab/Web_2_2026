import { mascotaService } from "../service/mascota-service.js";

const formu = document.querySelector("[data-form]");

const InfoMas = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const edad = document.querySelector("[data-edad]");
    const raza = document.querySelector("[data-raza]");
    const peso = document.querySelector("[data-peso]");
    const dueñoId = document.querySelector("[data-dueño-id]");

    try {
        const mascota = await mascotaService.mascota(id);
        // Validamos que existan las propiedades clave
        if (mascota.nombre !== undefined && mascota.dueñoId !== undefined) {
            nombre.value = mascota.nombre;
            edad.value = mascota.edad;
            raza.value = mascota.raza;
            peso.value = mascota.peso;
            dueñoId.value = mascota.dueñoId;
        } else {
            throw new Error("Datos incompletos");
        }
    } catch (error) {
        window.location.href = "../screens/error.html";
    }
}

InfoMas();

formu.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const dueñoId = document.querySelector("[data-dueño-id]").value;

    try {
        await mascotaService.editarMascota(id, nombre, edad, raza, peso, dueñoId);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (error) {
        alert("Ocurrió un error al editar la mascota.");
    }
});