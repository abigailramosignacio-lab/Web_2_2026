import cards from "./cards.js";
const tabla = (()=>{
           const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
           const addTask = (task) => {
               const nuevaFila = cuerpoTabla.insertRow();//creamos una nueva fila
               nuevaFila.insertCell(0).textContent = task.task;
               nuevaFila.insertCell(1).textContent = task.description;
               nuevaFila.insertCell(2).textContent = task.date;
               nuevaFila.insertCell(3).textContent =task.priority;
               //agregar acciones
               const accionCell = nuevaFila.insertCell(4);
               const acciones = document.createElement('div');
               acciones.className='actions';A

               //crear Botones
               //HECHO
               const completeButton = document.createElement('button');
               completeButton.textContent='Hecho';
               completeButton.className='view';
               completeButton.addEventListener('click',()=>{
                  nuevaFila.classList.toggle('completed');
                  cards.update();
                  //pendiente actualizar cards
               });
               acciones.appendChild(completeButton);

               //ELIMINAR
               const deleteButton = document.createElement('button');
               deleteButton.textContent='eliminar';
               deleteButton.className = 'delete';
               deleteButton.addEventListener('click',()=>{
                   cuerpoTabla.deleteRow(nuevaFila.rowIndex-1);
                   cards.update(); 
                   //pendienete actualizar cards
               });
               acciones.appendChild(deleteButton);
               accionCell.appendChild(acciones);

               //EDITAR
               const editButton = document.createElement('button');
               editButton.textContent = 'Editar';
               editButton.className='edit';
               editButton.addEventListener('click', ()=>{
                ///////
               })
           };
           const getTask = ()=>{
                return Array.from(cuerpoTabla.rows).map(row =>({
                    task:row.cells[0].textContent,
                    description: row.cells[1].textContent,
                    date:row.cells[2].textContent,
                    priority:row.cells[3].textContent,
                    completed:row.classList.contains('completed')
                }));
           };
           return{addTask,getTask}          
       })();
       export default tabla;


