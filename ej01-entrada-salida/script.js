//1. Localizar el botón que va a ser pulsado por el usuario
const botonCalcularEdad = document.getElementById("calcularBtn")

//2. Asociarle código al evento "el usuario hace clic sobre dicho botón"
botonCalcularEdad.addEventListener("click", function(){
    //2a. localizar la caja donde el usuario ha escrito el año de nacimiento
    const todosLosInput = document.getElementsByTagName("input")
    const inputAnyoNacim = todosLosInput[0]
    //equivalen a const InputAnyoNacim = document.getElementsByTagName("input")[0]
    
    //2b. extraer el nº que hay dentro de ese Input type number
    let anyoNacim = Math.floor(inputAnyoNacim.value)

    //2c. restar al año actual el año escrito por el usuario
    const anyoActual = new Date().getFullYear()
    if ( anyoNacim > 0 && anyoNacim <= anyoActual ) {
        const edad = anyoActual - anyoNacim
        //2d. mostrar el resultado en pantalla
        const todosLosLabel = document.getElementsByTagName("label")
        const labelSalida = todosLosLabel[1]
        labelSalida.textContent = "Tienes " + edad + " o " + (edad-1) + " años"
    } else {
        const todosLosLabel = document.getElementsByTagName("label")
        const labelSalida = todosLosLabel[1]
        labelSalida.textContent = "Has escrito un año incorrecto"
    }

} )

//OPCIÓN 1
    //añadir campo día y campo mes para que el cálculo sea 100% preciso
    // (le ponéis ID a todo si queréis)

//OPCIÓN 2
    //transformar el INPUT en un campo FECHA


/*

La etiqueta es un elemento típico de FORMULARIOS: .value
INPUT
...


La etiqueta es un elemento contenedor genérico: .textContent
P
H1 H2 H3...
LABEL

*/