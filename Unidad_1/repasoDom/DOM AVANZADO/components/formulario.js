const Form = (() => {

    const form = document.querySelector('[data-form]');

    const inputTask = document.querySelector('[data-input-task]');
    const inputDescription = document.querySelector('[data-input-descripcion]');
    const inputFecha = document.querySelector('[data-input-fecha]');
    const inputPrioridad = document.querySelector('[data-input-prioridad]');
    const inputMatery = document.querySelector('[data-input-materia]');
    const inputDocente = document.querySelector('[data-input-docente]');
    const inputFechaLimite = document.querySelector('[data-input-fechalimite]');

    // 📌 Obtener datos del formulario
    const obtenerDatos = () => {
        return {
            task: inputTask.value.trim(),
            description: inputDescription.value.trim(),
            date: inputFecha.value,
            priority: inputPrioridad.value.trim(),
            matery: inputMatery.value.trim(),
            docent: inputDocente.value.trim(),
            dateLim: inputFechaLimite.value,
            completed: false
        };
    };

    const reset = () => {
        form.reset();
    };

    const setDatos = (callback) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const datos = obtenerDatos();

            console.log("Enviando:", datos); 

            callback(datos);

            reset();
        });
    };

    return { setDatos };

})();

export default Form;