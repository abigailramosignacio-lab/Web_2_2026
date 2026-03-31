const saludar=()=>{
    console.log("funcion flecha");
};
saludar();
const duplicar = numero=>{
    return numero*2;
};
console.log(duplicar(5));

const suma= (a,b)=> {
    return a+b;
};
console.log(suma(2,3));


const crearUsuario=(nombre,edad)=>({nombre:nombre, edad:edad});
console.log(crearUsuario("Juan",28));

const numeros=[1,2,3,4,5,6,20]
//funcion para filtrar

const procesarNumeros=(numeros)=>{
        return numeros
        .filter(numero=>numero>10)
        .map(numero=>numero*2)
};

const resultado = procesarNumeros(numeros);
console.log(resultado);

const usuarios=[
    {nombre:"Juan", edad:23},
    {nombre:"Luis", edad:33},
    {nombre:"Maria", edad:25},
    {nombre:"Santy", edad:90},
    {nombre:"Felipe", edad:43},
]
const ProcesaUsuarios = (usuarios)=>{
    return usuarios.filter(usuarios=>usuarios.edad>18)//filtramos que la edad sea maypr a 18 años
    .map (usuario=>{
        const{nombre}=usuario;
        return nombre.lenght >5 ? nombre.toUpperCase() : nombre.toLowerCase();
    })
}


const resultado2=procesandoUsuarios(usuario);
console.log(resultado2);


