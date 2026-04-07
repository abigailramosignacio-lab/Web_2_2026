import { API_URL } from "../api.js";
import cards from "./cards.js";

const tabla = (() => {
    const cuerpoTabla = document.querySelector('#taskTable tbody');

    const cargar = async () => {
        try {
            const res = await fetch(API_URL);

            if (!res.ok) {
                throw new Error("Error al obtener datos");
            }

            const data = await res.json();

            cuerpoTabla.innerHTML = "";

            data.forEach(task => {
                const fila = cuerpoTabla.insertRow();

                fila.insertCell(0).textContent = task.task || "-";
                fila.insertCell(1).textContent = task.description || "-";
                fila.insertCell(2).textContent = task.date || "-";
                fila.insertCell(3).textContent = task.priority || "-";
                fila.insertCell(4).textContent = task.matery || "-";    
                fila.insertCell(5).textContent = task.docent || "-";    
                fila.insertCell(6).textContent = task.dateLim || "-";   

                const acciones = fila.insertCell(7); 

                // COMPLETAR
                const btnDone = document.createElement('button');
                btnDone.innerHTML = task.completed ? "↩" : "✔";
                btnDone.className = "view";

                btnDone.onclick = async () => {
                    await fetch(`${API_URL}/${task.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...task,
                            completed: !task.completed
                        })
                    });

                    cargar();
                };

                // EDITAR
                const btnEdit = document.createElement('button');
                btnEdit.innerHTML = "✏";
                btnEdit.className = "edit";

                btnEdit.onclick = async () => {
                    const nuevoNombre = prompt("Nuevo nombre:", task.task);
                    const nuevaDescripcion = prompt("Nueva descripción:", task.description);
                    const nuevaFecha = prompt("Nueva fecha:", task.date);
                    const nuevaPrioridad = prompt("Nueva prioridad:", task.priority);
                    const nuevaMateria = prompt("Nueva materia:", task.matery);
                    const nuevoDocente = prompt("Nuevo docente:", task.docent);
                    const nuevaFechaLim = prompt("Nueva fecha límite:", task.dateLim);

                    if (!nuevoNombre || !nuevaDescripcion) {
                        alert("Datos inválidos");
                        return;
                    }

                    await fetch(`${API_URL}/${task.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...task,
                            task: nuevoNombre,
                            description: nuevaDescripcion,
                            date: nuevaFecha,
                            priority: nuevaPrioridad,
                            matery: nuevaMateria,
                            docent: nuevoDocente,
                            dateLim: nuevaFechaLim
                        })
                    });

                    cargar();
                };
                //ELIMINAR
                const btnDelete = document.createElement('button');
                btnDelete.innerHTML = "🗑";
                btnDelete.className = "delete";

                btnDelete.onclick = async () => {
                    const confirmar = confirm("¿Seguro que quieres eliminar esta tarea?");
                    if (!confirmar) return;

                    await fetch(`${API_URL}/${task.id}`, {
                        method: "DELETE"
                    });

                    cargar();
                };

                acciones.appendChild(btnDone);
                acciones.appendChild(btnEdit); 
                acciones.appendChild(btnDelete);
            });

            cards.update(data);

        } catch (error) {
            console.error("Error general:", error);
        }
    };

    return { cargar };
})();

export default tabla;