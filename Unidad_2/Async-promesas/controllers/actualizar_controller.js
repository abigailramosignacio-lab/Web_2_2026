import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

const obInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id == null) {
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    try {
        const perfil = await clientService.cliente(id);

        if (perfil.nombre && perfil.email) {
            nombre.value = perfil.nombre;
            email.value = perfil.email;
        } else {
            throw new Error("Datos incompletos");
        }
    } catch (error) {
        console.error("Error:", error);
        window.location.href = "../screens/error.html";
    }
};

// Ejecutar al cargar la página
obInfo();

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;

    try {
        await clientService.actualizarCliente(nombre, email, id);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Ocurrió un error al actualizar el cliente.");
    }
});