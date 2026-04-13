//recepcion ce datos
/*const crearFila =(nombre,email)=>{
    const fila = document.createElement("tr"); //creamos una fila tr
    //html coo vaaiable
    const conntenido=
    `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;
  fila.innerHTML=conntenido;
  return fila;
}*/

const table= document.querySelector("[data-table]"); //seleccionamos la tabla
//conexion
/*const listar_clientes=()=>{
    const promesa = new Promise((resolve,reject)=>{
        const http = new XMLHttpRequest(); //creamos una instancia de XMLHttpRequest
        http.open("GET","http://localhost:3000/perfil"); //abrimos la conexion y listar la conexion a mi get
        http.send(); //enviamos la solicitud
        http.onload = () => {
            if (http.status >= 200 && http.status < 300) {
                const response = JSON.parse(http.response);
                resolve(response);
            } else {
                reject(`Error: ${http.status}`);
            }
        }; //cuando se cargue la respuesta
    });
    return promesa;
}*/

listar_clientes()
    .then((data) => {
        data.forEach((perfil) => {
            const nuevaFila = crearFila(
                perfil.nombre,
                perfil.email,
                perfil.id
            );
            table.appendChild(nuevaFila);
        });
    })
    .catch((error) => {
        console.error(error);
        alert("No existe conexión");
    });

const listar_clientes = () =>
    fetch("http://localhost:3000/perfil")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("Error al obtener los datos");
            }
            return respuesta.json();
        });

        
const crearCliente=(nombre, email)=>{
    return fetch("http://localhost:3000/perfil",{
        method: "POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify({nombre,email, id:uuid.v4()})
    })   //aqui esta el id por que lo estamos creando    
};

const actualizarCliente= (nombre, email, id)=>{//nunca modifico los identificadores
    return fetch(`http://localhost:3000/perfil/${id}`,{
         method:"PUT",
         headers:{"content-type":"application/json"},
         body: JSON.stringify({nombre,email})
    })
    .then((respuesta)=>console.log(respuesta)).catch((err)=>console.log(err))
};

const eliminarCliente=(id)=>{
    console.log("eliminar", id);
    return fetch(`http://localhost:3000/perfil/${id}`,{
        method:"DELETE"
    })
    .then((respuesta)=>console.log(respuesta)).catch((err)=>console.log(err))
}

//referencia a identificador

const cliente=(id)=>{
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta)=>respuesta.json());
}

export const clientService={
    listar_clientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    cliente
}