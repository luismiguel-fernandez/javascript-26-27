const ANCHURA_TABLERO = 800
const ALTURA_TABLERO = 500
const DIAMETRO_BOLA = 30
const TIEMPO_INICIAL = 10

const tablero = document.querySelector("#tablero")
const bola = document.querySelector("#bola")
const btnEmpezar = document.querySelector("#btnEmpezar")
const tiempo = document.querySelector("#tiempo")
const puntos = document.querySelector("#puntos")

const cuerpoRecords = document.querySelector("#records>tbody")

let records = [
    {n: "Dick", p: 9},
    {n: "Duck", p: 7},
    {n: "Deck", p: 5}
]

let segundero //controlar los segundos
let mueveBola //controlar que la bola se mueva automáticamente

//booleano para controlar si se suman puntos o no al clicar la bola
let partidaEnMarcha = false

tablero.style.width = ANCHURA_TABLERO + "px"
tablero.style.height = ALTURA_TABLERO + "px"
bola.style.width = DIAMETRO_BOLA + "px"
bola.style.height = DIAMETRO_BOLA + "px"

imprimirRecords()

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

function imprimirRecords() {
    //dejamos el TBODY vacío antes de insertar nuevas filas
    cuerpoRecords.innerHTML = ""
    //recorrer el array records
    records.forEach( (r,i) => {
        //por cada elemento del array añadir una fila y 2 celdas al cuerpo de tabla
        //createElement y append
        const nuevaFila = document.createElement("TR")
        const nuevaCelda1 = document.createElement("TD")
        const nuevaCelda2 = document.createElement("TD")
        const nuevaCelda3 = document.createElement("TD")
        nuevaCelda1.textContent = i+1 + "º"
        nuevaCelda2.textContent = r.n
        nuevaCelda3.textContent = r.p
        cuerpoRecords.append(nuevaFila)  //el nuevo TR sea hijo del TBODY
        nuevaFila.append(nuevaCelda1,nuevaCelda2,nuevaCelda3)

        //la insersción de filas y celdas mejor con "insertRow" e "insertCell"
        /*
            const nuevaFila = cuerpoRecords.insertRow()
            const nuevaCelda1 = nuevaFila.insertCell()
            const nuevaCelda2 = nuevaFila.insertCell()
            const nuevaCelda3 = nuevaFila.insertCell()
            nuevaCelda1.textContent = i+1 + "º"
            nuevaCelda2.textContent = r.n
            nuevaCelda3.textContent = r.p
        */
    })

}

function terminarPartida() {
    //detener los 2 Intervals que actualizan la bola y el reloj
    clearInterval(segundero)
    clearInterval(mueveBola)
    //desactivamos el booleano que indica que la partida está en marcha
    partidaEnMarcha = false
    //comprobamos si el jugador merece entrar en los records con esta partida
    if ( parseInt(puntos.textContent) > records[records.length-1].p ) {
        //merece entrar en los records
        let nombre = prompt("Escribe tu nombre:")
        records.push({
            n: nombre,
            p: parseInt(puntos.textContent)
        })
        records.sort( (r1,r2) => {
            if (r1.p <= r2.p) return 1
            else return -1
        })
        //el anterior sort equivale a este otro:
        //records.sort( (r1,r2) => r2.p - r1.p)

        records.pop()
        imprimirRecords()
    }
}

function tickReloj() {
    //bajar el marcador de tiempo y comprobar si el tiempo se ha acabado
    tiempo.textContent--
    if (tiempo.textContent <= "0") {
        terminarPartida()
    }
}

