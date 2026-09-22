//1. recuperar todos los elementos que vamos a necesitar

const inpEurosIniciales = document.getElementById("inpEurosIniciales")
const inpRentabAnual = document.getElementById("inpRentabAnual")
const inpDuracion = document.getElementById("inpDuracion")
const btnCalcular = document.getElementById("btnCalcular")
const taResultados = document.getElementById("taResultados")

inpEurosIniciales.focus()

//2. programar el botón
btnCalcular.addEventListener("click", function() {
    //2a. recuperar las cifras de los 3 INPUTS
    const eurosIniciales = inpEurosIniciales.value
    const rentabAnual = inpRentabAnual.value
    const duracion = inpDuracion.value

    //2b. hacer los cálculos
    //ahorros iniciales
    //hay que ir sumándole el 3% tantas veces como años
    //cada año el 3% se recalcula pq tus ahorros van creciendo
    let ahorros = parseInt(eurosIniciales)
    taResultados.value = ""
    for ( let i = 1; i <= duracion ; i++ ) {
        let intereses = ahorros * rentabAnual / 100
        ahorros = ahorros + intereses
        taResultados.value += `Después del año ${i} ya tienes ${ahorros.toFixed(2)}€\n`
    }
    ahorros = ahorros.toFixed(2)
    //2c. mostrar los resultados en el TEXTAREA
    let rentabReal = (ahorros - eurosIniciales) / 10 / duracion
    taResultados.value += `La rentabilidad real anual ha sido del ${rentabReal.toFixed(2)}%`
})

/*
Enunciado:

Elabora un programa en Javascript que pida al usuario:
    Una cantidad de euros.
    Un porcentaje de rentabilidad anual.
    Un número de años de duración del depósito.

A continuación, debe mostrar por pantalla:
    La evolución del depósito inicial a lo largo de los años establecidos.
    La rentabilidad total al acabar la duración del depósito.

Aclaraciones sobre datos admitidos:
    Cantidad en euros: un número entero positivo mayor o igual que 100.
    Rentabilidad anual: un número decimal positivo entre 0 y 100 admitiendo en la entrada una o más cifras decimales pero a continuación se redondeará a 2 cifras decimales.
    Duración del depósito: un número entero positivo mayor que cero.

Informar de las causas del error si el usuario introduce un dato no permitido.

*/