const Form = (()=>{
      const form = document.querySelector('[data-form]');// accedemos al formulario
      const inputTask = document.querySelector('[data-input-task]');// recupero input nombre de tarea
      const inputDescription = document.querySelector('[data-input-descripcion]');//inport descripcion
      const inputFecha = document.querySelector('[data-input-fecha]');//importacion fecha
      const inputPrioridad = document.querySelector('[data-input-prioridad]');//inport prioridad
      const inputMatery = document.querySelector('[data-input-materia]');
      const inputDocente = document.querySelector('[data-input-docente]');
      const inputFechaLimite = document.querySelector('[data-input-fechalimite]');

      const datosForm = () =>{
        return{
                task: inputTask.value.trim(),
                description: inputDescription.value.trim(),
                date: inputFecha.value.trim(),
                priority: inputPrioridad.value.trim(),
                matery: inputMatery.value.trim(),
        };
      };
      const reset =()=>{
        inputTask.value="";
        inputDescription.value="";
        inputFecha.value="";
        inputPrioridad.value="";
      }
      const setDatos = (callback)=>{
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            callback(datosForm());
            reset();
        });
      };
      return{setDatos,}
       })();
       export default Form;
