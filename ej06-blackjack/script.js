/* Reto 4
  Crea un documento HTML que simule aproximadamente el juego
  de Blackjack. Primero entregará al usuario un número aleatorio
  entre 1 y 11. A continuación preguntará al usuario si quiere
  más números. Mientras el usuario conteste que sí, el programa
  generará más números aleatorios entre 1 y 11. Si el usuario
  acumula más de 21 puntos directamente ha perdido.
  Si el jugador deja de pedir números antes de sobrepasar el 21,
  entonces el programa generará cartas aleatorias para el crupier
  para competir contra el jugador y decidir quién ha ganado
  la partida.
*/

const cartaBtn = document.querySelector("#cartaBtn")
const plantarseBtn = document.querySelector("#plantarseBtn")
const manoUl = document.querySelector("#manoUl")
const manoCrupierUl = document.querySelector("#manoCrupierUl")
const marcadorDiv = document.querySelector("#marcadorDiv")
const marcadorCrupierDiv = document.querySelector("#marcadorCrupierDiv")
const resultadoTA = document.querySelector("#resultadoTA")

const cuenta = document.querySelector("#cuenta")
const apuesta = document.querySelector("#apuesta")

let cartasJugador = []
let totalJugador = 0

cartaBtn.addEventListener("click",function(){
    if (cartasJugador.length == 0) {
        manoUl.innerHTML = ""
        resultadoTA.value = ""
        manoCrupierUl.innerHTML = ""
        marcadorCrupierDiv.textContent = "0 puntos"
        apuesta.disabled = true
    }
    let nuevaCarta = Math.floor(Math.random()*11) + 1 //genero carta entre 1 y 11
    cartasJugador.push(nuevaCarta)

    const nuevaCartaLI = document.createElement("LI")
    nuevaCartaLI.classList.add("list-group-item")
    nuevaCartaLI.textContent = nuevaCarta
    manoUl.append(nuevaCartaLI)

    totalJugador = sumArray(cartasJugador)
    marcadorDiv.textContent = totalJugador + " puntos"
    cartaBtn.textContent = "Sacar otra carta más"
    if (totalJugador > 21) {
        //Sacar un mensaje
        resultadoTA.value = "Te has pasado de 21. Pierdes.\n"
        //bloquear el botón de "sacar carta" o sustituir por "Empezar de nuevo"
        cartaBtn.textContent = "Empezar"
        cartasJugador = []
        cuenta.textContent -= parseInt(apuesta.value)
        apuesta.disabled = false
    }
})

plantarseBtn.addEventListener("click",function(){
    //si el jugador no ha sacado ninguna carta todavía, este clic no hace nada (return)
    if (cartasJugador.length == 0) return

    //juega el crupier
    let totalCrupier = 0
    while (totalCrupier < 17 /*&& totalCrupier < totalJugador*/ ) {
        let cartaCrupier = Math.floor(Math.random()*11) + 1

        const nuevaCartaLI = document.createElement("LI")
        nuevaCartaLI.classList.add("list-group-item")
        nuevaCartaLI.textContent = cartaCrupier
        manoCrupierUl.append(nuevaCartaLI)
        
        //resultadoTA.value += "El crupier saca la carta " + cartaCrupier + "\n"
        totalCrupier = totalCrupier + cartaCrupier
        marcadorCrupierDiv.textContent = totalCrupier + " puntos"
    }
    resultadoTA.value += "El crupier ha obtenido " + totalCrupier + "\n"
    //Una de dos: o el crupier ha pasado o igualado 17, o ha superado al jugador
    //Comprobar primero si se ha pasado
    if (totalCrupier > 21 || totalCrupier < totalJugador) {
        //el jugador gana
        resultadoTA.value += "Ganas la partida\n"
        cuenta.textContent = parseInt(cuenta.textContent) + parseInt(apuesta.value)
    } else if (totalCrupier == totalJugador) {
        //el jugador empata con el crupier
        resultadoTA.value += "Empatas la partida\n"
    } else {
        //el jugador pierde
        resultadoTA.value += "Pierdes la partida\n"
        cuenta.textContent -= parseInt(apuesta.value)
    }
    cartasJugador = []
    cartaBtn.textContent = "Empezar"
    apuesta.disabled = false
})

function sumArray(arr) {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

//botonEmpezar.style.display = "none"
//botonEmpezar.disabled = true