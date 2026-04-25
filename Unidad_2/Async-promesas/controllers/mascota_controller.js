import { mascotaService } from "../service/mascota-service.js";

const crearFila = async (nombre, edad, raza, peso, duenoid, id) => {
    const fila = document.createElement("tr");
    let infoDueno = "Cargando...";

    try {
        const dueno = await mascotaService.obtenerDueno(duenoid);
        infoDueno = dueno.nombre;
    } catch (e) {
        infoDueno = "No asignado";
    }

    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${edad}</td>
        <td>${raza}</td>
        <td>${peso}</td>
        <td>${infoDueno}</td>
        <td>
            <ul class="table__button-control">
                <li><a href="../screens/editar_mascota.html?id=${id}" class="simple-button simple-button--edit">Editar</a></li>
                <li><button class="simple-button simple-button--delete" type="button" data-id="${id}">Eliminar</button></li>
            </ul>
        </td>`;
    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        mascotaService.eliminarMascota(btn.dataset.id)
            .then(() => {
                alert("Mascota eliminada");
                window.location.reload();
            })
            .catch(() => alert("Error al eliminar"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");
mascotaService.listarMascotas()
    .then(async (data) => {
        for (const mascota of data) {
            const fila = await crearFila(mascota.nombre, mascota.edad, mascota.raza, mascota.peso, mascota.duenoid, mascota.id);
            table.appendChild(fila);
        }
    })
    .catch(() => alert("Error al cargar mascotas"));