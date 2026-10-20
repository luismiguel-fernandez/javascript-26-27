//código JS
const game = document.querySelector("#game")
const year = document.querySelector("#year")
const platform = document.querySelector("#platform")
const sendBtn = document.querySelector("#sendBtn")
const videogamesList = document.querySelector("#videogamesList")

const db = [
    {title: "hola", year: "1970", platform: "dos" },
    {title: "adios", year: "1975", platform: "win" },
    {title: "que tal", year: "1965", platform: "atari" }
]

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

    }
})