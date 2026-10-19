//código JS
const COMPANIES = [
    "Microsoft",
    "Apple",
    "Google",
    "Cisco",
    "Amazon",
    "Nvidia",
    "Intel",
    "Patatas Acho"
]

const studentName = document.querySelector("#studentName")
const choice1 = document.querySelector("#choice1")
const choice2 = document.querySelector("#choice2")
const insertButton = document.querySelector("#insertButton")
const errorMsg = document.querySelector("#errorMsg")
const choicesBody = document.querySelector("#studentsChoices>tbody")

studentName.focus()
choice2.disabled = true

populateChoice1()
choice1.addEventListener("change",function(){
    if (choice1.value != "0") {
        // el usuario ha elegido una empresa válida en choice1
        populateChoice2()
        // desbloqueamos choice2 para que elija su segunda preferencia
        choice2.disabled = false
    } else {
        // el usuario ha decidido "resetear" el choice1 --> tb reseteamos choice2
        choice2.innerHTML = "<OPTION value='0'>(choose one)</OPTION>"
        // volvemos a bloquear choice2 porque el usuario no tiene elegida empresa1
        choice2.disabled = true
    }
})

insertButton.addEventListener("click", insertUserPreferences )

choicesBody.addEventListener("click", function(e) {
    //AHORA TENEMOS UN UNICO LISTENER PARA TODO EL TBODY
    //ASI EVITAMOS TENER UN LISTERNER PARA CADA FILA Y CADA BOTON BORRAR
    //PERO SE HACE MAS DIFICIL SABER SI LO QUE SE HA PULSADO ES EL BOTON ESPERADO
    //POR ESO HACEMOS ESTAS BUSQUEDAS CON LA FUNCION "closest"
    let button = e.target.closest(".btn-danger")
    if (!button) return
    button.closest("tr").remove()
})

/*****************  FUNCIONES AUXILIARES *************/

function createNewUserPreferencesRow(){
    //recuperamos los 3 datos insertados por el usuario
    const userName = studentName.value.trim()
    const company1 = COMPANIES[ choice1.value - 1 ]
    const company2 = COMPANIES[ choice2.value - 1 ]
    //crear una fila con al menos 3 celdas para imprimir esos 3 datos
    const newTR = choicesBody.insertRow()
    const newTD1 = newTR.insertCell()
    const newTD2 = newTR.insertCell()
    const newTD3 = newTR.insertCell()
    newTD1.textContent = userName
    newTD2.textContent = company1
    newTD3.textContent = company2
    //crear una 4ª celda para que aloje un botón de "Borrar fila"
    const newTD4 = newTR.insertCell()
    const newDeleteRowButton = document.createElement("BUTTON")
    newTD4.append(newDeleteRowButton)
    newDeleteRowButton.classList.add("btn","btn-danger","btn-sm")
    newDeleteRowButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
        `
    // DE ESTA FORMA, SI HAY 1000 FILAS, HAY 1000 BOTONES y 1000 LISTENERS
    /*
    newDeleteRowButton.addEventListener("click", function() {
        newTR.remove()
    })
    */
    // SOLUCION ALTERNATIVA Y MEJOR PARA TENER 1 SOLO LISTENER CON N FILAS
    //  Esta solución no se programa aquí, en la función de crear filas
    //   sino fuera de la función
}

function insertUserPreferences() {
    //borrar por si existe de antes cualquier mensaje de error
    errorMsg.textContent = ""

    //comprobar si los 3 campos han sido rellenados correctamente
    // e insertar si todo va bien o mostrar errores si algo falla
    if ( studentName.value.trim().length > 0 ) {
        if ( choice1.value != "0" ) {
            if ( choice2.value != "0" ) {
                //TODO OK -> INSERTAR EN LA TABLA
                createNewUserPreferencesRow()
                //Y ADEMÁS -> VACIAR FORMULARIO PARA SEGUIR INSERTANDO
                studentName.value = ""
                choice1.value = "0"
                choice2.value = "0"
                studentName.focus()
                choice2.disabled = true
            } else {
                //ha fallado el choice2
                errorMsg.textContent = "You must choose a valid company as second choice"
            }
        } else {
            //ha fallado el choice1
            errorMsg.textContent = "You must choose a valid company as first choice"
        }
    } else {
        //ha fallado el nombre
        errorMsg.textContent = "You must write a valid name"
    }
} //function

function populateChoice1() {
    COMPANIES.forEach( (c,i) => {
        const newOption = document.createElement("OPTION")
        choice1.append(newOption)
        newOption.textContent = c
        newOption.value = i+1
    })
}

function populateChoice2() {
    // vaciamos (o casi) el choice2, si no se podrían apilar las empresas n veces
    choice2.innerHTML = "<OPTION value='0'>(choose one)</OPTION>"

    COMPANIES.forEach( (c,i) => {
        if ( (i+1) != choice1.value ) {
            // la empresa que toca insertar NO ES la que se ha elegido en CHOICE1
            const newOption = document.createElement("OPTION")
            choice2.append(newOption)
            newOption.textContent = c
            newOption.value = i+1
        }
    })
}
