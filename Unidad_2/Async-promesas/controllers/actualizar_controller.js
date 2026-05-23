import { DatabaseEnvChangeToken } from "tedious/lib/token/token.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
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
            throw new Error();
        }
    } catch (error) {
        window.location.href = "../screens/error.html";
    }
};

obtenerInformacion();

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;

    try {
        await clientService.editarCliente(id, nombre, email);
        window.location.href = "../screens/edicion_concluida.html";
    } catch (err) {
        console.log(err);
    }
});


//create Database
