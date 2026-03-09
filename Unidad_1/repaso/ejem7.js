let productos =[
    {nombre: "laptop", precio: 1000, cantidad: 2},
    {nombre: "mouse", precio: 70, cantidad: 1},
    {nombre: "teclado", precio: 150, cantidad: 3}
]
function sumarProductos(productos){
    let suma=0;

    for (let obj of productos){
        suma += obj.precio * obj.cantidad;
    }   return suma;        

}
console.log(sumarProductos(productos));

const sumarProductos2 = (productos) => { 
    let suma = 0;
    for (let obj of productos){
        suma += obj.precio * obj.cantidad;
    }   
    return suma;

}
console.log(sumarProductos2(productos));


