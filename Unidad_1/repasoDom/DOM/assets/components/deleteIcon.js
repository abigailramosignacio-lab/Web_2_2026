const deletIcon =()=>{
    const i = document.createElement('i');//creo un elemento i
    i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');//le agrego la clase fas
    i.addEventListener('click', deleteTask )
    return i;
}

const deleteTask = (evento)=>{//identificar antes quien es su papa
    const parent = evento.target.parentElement;//recupero el elemento padre del icono de eliminar
    parent.remove();//elimino el elemento padre del icono de eliminar
}

export default deletIcon;