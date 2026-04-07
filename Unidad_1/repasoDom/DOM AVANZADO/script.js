import Form from "./components/formulario.js";
import tabla from "./components/tabla.js";
import { API_URL } from "./api.js";

const iniciar = () => {
    console.log("App iniciada...");
    tabla.cargar(); // carga datos desde API
};

Form.setDatos(async (task) => {
    try {
        console.log("Enviando a API:", task);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error("Error al guardar");
        }

        const data = await response.json();
        console.log("Guardado correctamente:", data);

        tabla.cargar();

    } catch (error) {
        console.error("Error:", error);
    }
});
// EJECUTAR
iniciar();