const ANCHURA_TABLERO = 800
const ALTURA_TABLERO = 500
const DIAMETRO_BOLA = 30
const TIEMPO_INICIAL = 10

const tablero = document.querySelector("#tablero")
const bola = document.querySelector("#bola")
const btnEmpezar = document.querySelector("#btnEmpezar")
const tiempo = document.querySelector("#tiempo")
const puntos = document.querySelector("#puntos")

let segundero //controlar los segundos
let mueveBola //controlar que la bola se mueva automáticamente

//booleano para controlar si se suman puntos o no al clicar la bola
let partidaEnMarcha = false

tablero.style.width = ANCHURA_TABLERO + "px"
tablero.style.height = ALTURA_TABLERO + "px"
bola.style.width = DIAMETRO_BOLA + "px"
bola.style.height = DIAMETRO_BOLA + "px"

btnEmpezar.addEventListener("click", empezarPartida )
bola.addEventListener("click", clicEnBola )

function clicEnBola() {
    if (partidaEnMarcha) {
        puntos.textContent = parseInt(puntos.textContent) + 1
        //cambiar bola de sitio para impedir que el usuario sume + puntos con doble clic
        colocarBolaAleatorio()
        //reseteamos el Interval que controla el movimiento automático de la bola
        clearInterval(mueveBola)
        mueveBola = setInterval( colocarBolaAleatorio, 1000 )
    }
}

function colocarBolaAleatorio() {
    let posX = Math.floor(Math.random()*(ANCHURA_TABLERO-DIAMETRO_BOLA))
    let posY = Math.floor(Math.random()*(ALTURA_TABLERO-DIAMETRO_BOLA))
    bola.style.left = posX + "px"
    bola.style.top = posY + "px"
}

function empezarPartida() {
    //puntos a 0
    puntos.textContent = 0
    //tiempo a TIEMPO_INICIAL
    tiempo.textContent = TIEMPO_INICIAL
    //colocar bola en posición inicial aleatoria
    colocarBolaAleatorio()
    //activamos el booleano que indica que la partida está en marcha
    partidaEnMarcha = true

    //poner en marcha un crono para que la bola cambie de posicion sola
    // pero antes borramos el crono por si ya existía de pulsaciones anteriores
    clearInterval(segundero)
    clearInterval(mueveBola)
    segundero = setInterval( tickReloj, 1000 )
    mueveBola = setInterval( colocarBolaAleatorio, 1000 )
}

function terminarPartida() {
    //detener los 2 Intervals que actualizan la bola y el reloj
    clearInterval(segundero)
    clearInterval(mueveBola)
    //desactivamos el booleano que indica que la partida está en marcha
    partidaEnMarcha = false
}

function tickReloj() {
    //bajar el marcador de tiempo y comprobar si el tiempo se ha acabado
    tiempo.textContent--
    if (tiempo.textContent <= "0") {
        terminarPartida()
    }
}

