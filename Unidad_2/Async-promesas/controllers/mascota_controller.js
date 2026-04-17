import { mascotaService } from "../service/mascota-service.js";

const crearFila = async (nombre, edad, raza, peso, dueñoId, id) => {
    const fila = document.createElement("tr");
    let infoDueño = "Cargando...";
    
    try {
        const dueño = await mascotaService.obtenerDueño(dueñoId);
        infoDueño = `${dueño.nombre}`;
    } catch (e) { infoDueño = "No asignado"; }

    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${edad}</td>
        <td>${raza}</td>
        <td>${peso}</td>
        <td>${infoDueño}</td>
        <td>
            <ul class="table__button-control">
                <li><a href="../screens/editar_mascota.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
                <li><button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button></li>
            </ul>
        </td>`;
    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        mascotaService.eliminarMascota(btn.id).then(() => {
            alert("Mascota eliminada");
            window.location.reload();
        }).catch(() => alert("Error al eliminar"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");
mascotaService.listarMascotas().then(async (data) => {
    for (const mascota of data) {
        const nuevaFila = await crearFila(mascota.nombre, mascota.edad, mascota.raza, mascota.peso, mascota.dueñoId, mascota.id);
        table.appendChild(nuevaFila);
    }
}).catch(() => alert("Error al cargar mascotas"));