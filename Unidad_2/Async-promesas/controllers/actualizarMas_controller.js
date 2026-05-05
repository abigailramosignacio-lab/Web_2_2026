import { mascotaService } from "../service/mascota-service.js";

const formMas = document.querySelector("[data-form]");

const cargarDatosMascota = async () => {
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
    const duenold = document.querySelector("[data-dueño-id]");

    try {
        const mascota = await mascotaService.mascota(id);
        // Usamos duenold con 'l' minúscula para que coincida con tu DB
        if (mascota.nombre !== undefined && mascota.duenold !== undefined) {
            nombre.value = mascota.nombre;
            edad.value = mascota.edad;
            raza.value = mascota.raza;
            peso.value = mascota.peso;
            duenold.value = mascota.duenold;
        } else {
            throw new Error("Mascota no encontrada");
        }
    } catch (error) {
        console.error("Error al obtener mascota:", error);
        window.location.href = "../screens/error.html";
    }
};

cargarDatosMascota();

formMas.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const datos = {
        nombre: document.querySelector("[data-nombre]").value.trim(),
        edad: document.querySelector("[data-edad]").value.trim(),
        raza: document.querySelector("[data-raza]").value.trim(),
        peso: document.querySelector("[data-peso]").value.trim(),
        duenold: document.querySelector("[data-dueño-id]").value.trim()
    };

    try {
        await mascotaService.editarMascota(id, datos.nombre, datos.edad, datos.raza, datos.peso, datos.duenold);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Ocurrió un error al editar la mascota.");
    }
});