const checkComplete =()=>{
    const i = document.createElement('i');//creo un elemento i
    i.classList.add('far', 'fa-check-square', 'icon');//le agrego la clase far
    i.addEventListener('click', color);//le agrego un evento click para cambiar el color del check
    return i;
}
const color =(evento)=>{
    const element=evento.target;//recupero el elemento que se hizo click y cambio el color del check
    element.classList.add('fas');
    element.classList.add('completeIcon');
    element.classList.remove('far');
}
export default checkComplete;