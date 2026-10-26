//código JS
const game = document.querySelector("#game")
const year = document.querySelector("#year")
const platform = document.querySelector("#platform")
const sendBtn = document.querySelector("#sendBtn")
const videogamesList = document.querySelector("#videogamesList")

let db
//si hay una instancia del array DB en localStorage entonces se inicializa con eso
if (localStorage.getItem("vgList")) {
    db = JSON.parse( localStorage.getItem("vgList") )
}
//si no hay nada en localStorage se inicializa a array vacío
else {
    db = []
}

dbToTable(db)

sendBtn.addEventListener("click", function(){
    let todoOK = true
    //comprobar nombre
    if (game.value.trim().length > 0) {
        document.querySelector("#divGame div").classList.remove("is-invalid")
        document.querySelector("#divGame div").classList.add("is-valid")
        game.classList.remove("is-invalid")
        game.classList.add("is-valid")
    } else {
        document.querySelector("#divGame div").classList.add("is-invalid")
        document.querySelector("#divGame div").classList.remove("is-valid")
        game.classList.add("is-invalid")
        game.classList.remove("is-valid")
        todoOK = false
    }
    //comprobar año
    let yearValue = parseInt(year.value.trim())
    if (yearValue > 1900 && yearValue < 2050) {
        document.querySelector("#divYear div").classList.remove("is-invalid")
        document.querySelector("#divYear div").classList.add("is-valid")
        year.classList.remove("is-invalid")
        year.classList.add("is-valid")
    } else {
        document.querySelector("#divYear div").classList.add("is-invalid")
        document.querySelector("#divYear div").classList.remove("is-valid")
        year.classList.add("is-invalid")
        year.classList.remove("is-valid")
        todoOK = false
    }
    //comprobar plataforma
    if ( parseInt(platform.value) > 0 ) {
        document.querySelector("#divPlatform div").classList.remove("is-invalid")
        document.querySelector("#divPlatform div").classList.add("is-valid")
        platform.classList.remove("is-invalid")
        platform.classList.add("is-valid")
    } else {
        document.querySelector("#divPlatform div").classList.add("is-invalid")
        document.querySelector("#divPlatform div").classList.remove("is-valid")
        platform.classList.add("is-invalid")
        platform.classList.remove("is-valid")
        todoOK = false
    }

    //comprobar el booleano
    if (todoOK) {
        //insertar en el array y redibujar la tabla html
        db.push({
            title: game.value.trim(),
            year: yearValue,
            platform: platform[platform.selectedIndex].textContent
        })
        //guardamos en LocalStorage un objeto vgList que contiene nuestra "db"
        // convertida en string porque en localStorage se guarda todo en string
        localStorage.setItem("vgList", JSON.stringify(db) )
        dbToTable(db)
        clearForm()
    }
})

/* ******************* FUNCIONES AUXILIARES ******************* */

function clearForm() {
    //vaciar formulario
    game.value = ""
    year.value = ""
    platform.selectedIndex = 0
    //quitar los bordes verdes del form


}

function dbToTable(aDb) {
    // convertir el array aDb en una tabla HTML
    const tbody = videogamesList.querySelector("tbody")
    tbody.innerHTML = ""
    aDb.forEach( e => {
        const newRow = tbody.insertRow()
        const newCell1 = newRow.insertCell()
        const newCell2 = newRow.insertCell()
        const newCell3 = newRow.insertCell()
        const newCell4 = newRow.insertCell()

        newCell1.textContent = e.title
        newCell2.textContent = e.year
        newCell3.textContent = e.platform
    })

}