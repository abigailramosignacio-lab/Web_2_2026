import { API_URL } from "../api.js";

const cards = (() => {
    const taskCards = document.getElementById('taskCards');

    const update = (tasks = []) => {

        taskCards.innerHTML = '';

        if (tasks.length === 0) {
            taskCards.innerHTML = "<p>No hay tareas registradas</p>";
            return;
        }

        tasks.forEach(task => {

            const card = document.createElement('div');
            card.className = 'taskCard';

            card.innerHTML = `
                <p><strong>Nombre:</strong> ${task.task || '-'}</p>
                <p><strong>Descripción:</strong> ${task.description || '-'}</p>
                <p><strong>Fecha:</strong> ${task.date || '-'}</p>
                <p><strong>Prioridad:</strong> ${task.priority || '-'}</p>
                <p><strong>Materia:</strong> ${task.matery || '-'}</p>
                <p><strong>Docente:</strong> ${task.docent || '-'}</p>
                <p><strong>Fecha Límite:</strong> ${task.dateLim || '-'}</p>
                <p><strong>Estado:</strong> ${task.completed ? 'Completada' : 'Pendiente'}</p>

                <div class="cardActions">
                    <button class="btnDone">✔</button>
                    <button class="btnDelete">❌</button>
                </div>
            `;

            card.querySelector('.btnDone').addEventListener('click', async () => {
                try {
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

                    location.reload(); 

                } catch (error) {
                    console.error("Error al completar:", error);
                }
            });

            card.querySelector('.btnDelete').addEventListener('click', async () => {
                try {
                    const confirmar = confirm("¿Eliminar tarea?");
                    if (!confirmar) return;

                    await fetch(`${API_URL}/${task.id}`, {
                        method: "DELETE"
                    });

                    location.reload();

                } catch (error) {
                    console.error("Error al eliminar:", error);
                }
            });

            taskCards.appendChild(card);
        });
    };

    return { update };

})();

export default cards;