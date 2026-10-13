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


/*****************  FUNCIONES AUXILIARES *************/

function insertUserPreferences() {
    //borrar por si existe de antes cualquier mensaje de error
    errorMsg.textContent = ""

    //comprobar si los 3 campos han sido rellenados correctamente
    // e insertar si todo va bien o mostrar errores si algo falla
    if ( studentName.value.trim().length > 0 ) {
        if ( choice1.value != "0" ) {
            if ( choice2.value != "0" ) {
                //TODO OK -> INSERTAR EN LA TABLA
                
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
