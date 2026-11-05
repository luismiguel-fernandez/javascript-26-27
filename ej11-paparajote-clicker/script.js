const Interfaz = {
    numPpj: document.querySelector("#numPpj"),
    numPpjPs: document.querySelector("#numPpjPs"),
    btnPpj: document.querySelector("#btnPpj"),
    divTienda: document.querySelector("#divTienda")
}

const Partida = {
    numPpj: 0,
    numPpjPs: 0,
    numPpjPc: 1,
    numCursores: 0,
    numAbuelas: 0,
    numFabricas: 0
}

const Mejoras = [
    {
        nombre: "Cursores",
        precioInicial: 15,
        unidadesCompradas: 0,
        precioActual: 15,
        incPps: 0.1,
        icono: "img/cursor.webp"
    },
    {
        nombre: "Abuelas",
        precioInicial: 100,
        unidadesCompradas: 0,
        precioActual: 100,
        incPps: 1,
        icono: "img/abuela.webp"
    },
    {
        nombre: "Granjas",
        precioInicial: 1100,
        unidadesCompradas: 0,
        precioActual: 1100,
        incPps: 8,
        icono: "img/granja.webp"
    }
]

const INC_PRECIO = 1.15 //15% de subida de precio cada vez que compramos algo

dibujarMejoras()

Interfaz.btnPpj.addEventListener("click", clickPaparajote )

function clickPaparajote() {
    Partida.numPpj += Partida.numPpjPc
    Interfaz.numPpj.textContent = Partida.numPpj.toFixed(0)
}

function dibujarMejoras() {
    Interfaz.divTienda.innerHTML = "<h2>TIENDA</h2>"
    
    Mejoras.forEach( m => {

        let nuevoDivMejora = document.createElement("DIV")
        nuevoDivMejora.classList.add("row")
        nuevoDivMejora.innerHTML = `
            <div class="col">
                <img src="${m.icono}">
            </div>
            <div class="col">
                <h5>${m.nombre}</h5>
                <span >${m.precioActual.toFixed(0)}</span>
            </div>
            <div class="col">
                <h1>${m.unidadesCompradas}</h1>
            </div>
        `

        Interfaz.divTienda.append(nuevoDivMejora)

        nuevoDivMejora.addEventListener("click", function(){
            //comprobar si tengo suficiente "dinero" para pagarlo
            if (Partida.numPpj >= m.precioActual) {
                //puedo pagar esa mejora:
                //restar lo que me estoy gastando
                Partida.numPpj -= m.precioActual
                //incrementar el num de unidades compradas de esta mejora
                m.unidadesCompradas++
                //incrementar el precio de esta mejora para futuras compras
                m.precioActual *= INC_PRECIO
                //incrementar mi producción pasiva de paparajotes
                Partida.numPpjPs += m.incPps
                //refrescar la lista de mejoras con mi nueva compra
                dibujarMejoras()
                //refrescar el marcador de la partida
                refrescarMarcador()
            }
        })
    })
}

function refrescarMarcador() {
    Interfaz.numPpj.textContent = Math.floor(Partida.numPpj).toFixed(0)
    Interfaz.numPpjPs.textContent = Partida.numPpjPs.toFixed(1)
}