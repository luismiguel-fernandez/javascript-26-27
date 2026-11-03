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
        icono: "img/cursor.webp"
    },
    {
        nombre: "Abuelas",
        precioInicial: 100,
        icono: "img/abuela.webp"
    },
    {
        nombre: "Granjas",
        precioInicial: 1100,
        icono: "img/granja.webp"
    }
]

dibujarMejoras()

Interfaz.btnPpj.addEventListener("click", clickPaparajote )

function clickPaparajote() {
    Partida.numPpj += Partida.numPpjPc
    Interfaz.numPpj.textContent = Partida.numPpj
}

function dibujarMejoras() {
    Mejoras.forEach( m => {

        let nuevoDivMejora = document.createElement("DIV")
        nuevoDivMejora.classList.add("row")
        nuevoDivMejora.innerHTML = `
            <div class="col">
                <img src="${m.icono}">
            </div>
            <div class="col">
                <h5>${m.nombre}</h5>
            </div>
        `

        Interfaz.divTienda.append(nuevoDivMejora)
    })
}