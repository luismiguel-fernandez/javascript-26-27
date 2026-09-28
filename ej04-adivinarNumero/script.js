const guess = document.getElementById("guess")
const submitBtn = document.querySelector("#submitBtn")
const attempts = document.querySelector("#attempts")
const message = document.querySelector("#message")

guess.focus()

const secret = Math.floor(Math.random()*100)+1
//console.log("Secret = " + secret)
let tries = 6

guess.addEventListener("keyup", function(ev){
    if (ev.key == "Enter") checkNumber()
} )

submitBtn.addEventListener("click", checkNumber )

function checkNumber(){
    //Recoger el valor escrito por el usuario
    let userTry = parseInt(guess.value)
    if ( userTry === secret ) {
        message.innerHTML += "Acertaste"
        finishGame()
    } else {
        // decrementar los intentos restantes para el usuario
        tries--
        attempts.textContent = "Intentos restantes: " + tries
        
        // indicar al usuario si se ha pasado o se ha quedado corto
        if ( userTry > secret ) message.innerHTML += "Con el nº " + userTry + " te has pasado<br>"
        else message.innerHTML += "Con el nº " + userTry + " te has quedado corto<br>"
        
        // vaciar la caja de texto del usuario
        guess.value = ""

        //comprobar si el usuario ha agotado los 6 intentos
        if (tries == 0) {
            message.innerHTML += "Has agotado los 6 intentos. El secreto era: " + secret
            finishGame()
        }
    }
} //END function checkNumber

function finishGame() {
    guess.disabled = true
    submitBtn.disabled = true
}