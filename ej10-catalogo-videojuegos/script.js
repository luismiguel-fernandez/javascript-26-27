//código JS
const game = document.querySelector("#game")
const year = document.querySelector("#year")
const platform = document.querySelector("#platform")
const sendBtn = document.querySelector("#sendBtn")
const videogamesList = document.querySelector("#videogamesList")
const pattern = document.querySelector("#pattern")

const titleTH = videogamesList.querySelector("th")
const yearTH = videogamesList.querySelector("th:nth-child(2)")
const platformTH = videogamesList.querySelector("th:nth-child(3)")

/*
let db
//si hay una instancia del array DB en localStorage entonces se inicializa con eso
if (localStorage.getItem("vgList")) {
    db = JSON.parse( localStorage.getItem("vgList") )
}
//si no hay nada en localStorage se inicializa a array vacío
else {
    db = []
}
*/ 
// el bloque anterior equivale a esta línea de abajo
let db = JSON.parse( localStorage.getItem("vgList") || "[]" )
let filtered = db
let favs = JSON.parse( localStorage.getItem("favsList") || "[]" )

let order = false   // false: a..z  0..9
                    // true: z..a   9..0

//reordenamos nuestra BD para que al inicio se muestre siempre por título A..Z
db.sort( (v1,v2) => v1.title.localeCompare(v2.title) )

dbToTable( db )

pattern.addEventListener("input", function(){
    //filtrar nuestro array local "db"
    filtered = db.filter( v =>
        v.title.toLowerCase().includes( pattern.value.trim().toLowerCase() ) 
        || v.year.toLowerCase().includes( pattern.value.trim().toLowerCase() )
        || v.platform.toLowerCase().includes( pattern.value.trim().toLowerCase() )
    )
    //mostrar en el html el resultado del filtrado
    dbToTable(filtered)
})

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
            year: year.value.trim(),
            platform: platform[platform.selectedIndex].textContent
        })
        //guardamos en LocalStorage un objeto vgList que contiene nuestra "db"
        // convertida en string porque en localStorage se guarda todo en string
        localStorage.setItem("vgList", JSON.stringify(db) )
        dbToTable(db)
        clearForm()
    }
})

titleTH.addEventListener("click", function() {
    order = !order //el primer clic lo pasa de false a true (a..z -> z..a)
    if (order)
        filtered.sort( (v1,v2) => v2.title.localeCompare(v1.title) )
    else
        filtered.sort( (v1,v2) => v1.title.localeCompare(v2.title) )
    dbToTable(filtered)
})
yearTH.addEventListener("click", function() {
    order = !order //el primer clic lo pasa de false a true (a..z -> z..a)
    if (order)
        filtered.sort( (v1,v2) => v2.year.localeCompare(v1.year) )
    else
        filtered.sort( (v1,v2) => v1.year.localeCompare(v2.year) )
    dbToTable(filtered)
})
platformTH.addEventListener("click", function() {
    order = !order //el primer clic lo pasa de false a true (a..z -> z..a)
    if (order)
        filtered.sort( (v1,v2) => v2.platform.localeCompare(v1.platform) )
    else
        filtered.sort( (v1,v2) => v1.platform.localeCompare(v2.platform) )
    dbToTable(filtered)
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

        const newButton = document.createElement("BUTTON")
        newButton.classList.add("btn", "btn-outline-danger", "btn-sm")
        
        let index = favs.findIndex( v => v.title == e.title && v.year == e.year && e.platform == v.platform )
        if (index >= 0) {
            newButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            `     
        } else {
            newButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
            `
        }
        newCell4.append(newButton)

        newButton.addEventListener("click", function(){
            //buscar si este juego está en el array favoritos
            let index = favs.findIndex( v => v.title == e.title && v.year == e.year && e.platform == v.platform )
            if (index >= 0) {
                //ese juego sí está en favoritos, quitarlo y vaciar el corazón
                favs.splice(index,1)
                newButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                `
            } else {
                //si no está en favoritos, añadirlo y rellenar corazón
                favs.push(e)
                newButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                `
            }
            localStorage.setItem("favsList", JSON.stringify(favs) )
        })
    })

}