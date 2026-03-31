const datos=[
    {
        'pais':'Bolivia',
        'precio':200,
    },
    {
        'pais':'Ecuador',
        'precio':500,
    },
    {
        'pais':'Brasil',
        'precio':900,
    },
    {
        'pais':'Venezuela',
        'precio':100,
    },
    {
        'pais':'Paraguay',
        'precio':200,
    },
];


const presupuesto = 300;
let paisSeleccionado = '';

// ciclo FOR
for (let i = 0; i < datos.length; i++) {
    if (datos[i].precio <= presupuesto) {
        paisSeleccionado = datos[i].pais;
        break;
    }
}

if (paisSeleccionado === '') {
    console.log("No existen los pasajes");
} else {
    console.log(`Puedes comprar pasajes para: ${paisSeleccionado}`);
}