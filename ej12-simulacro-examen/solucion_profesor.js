const inpArt = document.querySelector("#inpArt")
const inpTit = document.querySelector("#inpTit")
const inpLen = document.querySelector("#inpLen")
const btnAddSong = document.querySelector("#btnAddSong")
const feedback1 = document.querySelector("#feedback1")

const inpSearch = document.querySelector("#inpSearch")
const btnSearch  = document.querySelector("#btnSearch")

const btnSortArtist = document.querySelector("#btnSortArtist")
const btnSortTitle = document.querySelector("#btnSortTitle")
const btnSortLenInc = document.querySelector("#btnSortLenInc")
const btnSortLenDec = document.querySelector("#btnSortLenDec")

const inpDelete = document.querySelector("#inpDelete")
const btnDelete = document.querySelector("#btnDelete")
const feedback2 = document.querySelector("#feedback2")

const inpEdit = document.querySelector("#inpEdit")
const btnEdit = document.querySelector("#btnEdit")
const feedback3 = document.querySelector("#feedback3")

const divSongList = document.querySelector("#divSongList")

let songList = [
    // {artist: "Radiohead", title: "Creep", duration: "234"},
    // {artist: "Radiohead", title: "High and dry", duration: "189"},
    // {artist: "Kings of Leon", title: "Supersoaker", duration: "175"},
    // {artist: "Kings of Leon", title: "Pyro", duration: "251"},
    // {artist: "Editors", title: "Munich", duration: "210"}
]
listSongList(songList)
inpDelete.value = ""
inpArt.focus()

btnAddSong.addEventListener("click",function(){
    let artist = inpArt.value.trim()
    let title = inpTit.value.trim()
    let duration = inpLen.value.trim()
    let expreg = /^[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ0-9 ]+$/
    let valid = true
    feedback1.textContent = ""
    if (!expreg.test(artist)) {
        inpArt.classList.add("is-invalid")
        feedback1.innerHTML = "Artist name is not valid<br>"
        valid = false
    } else {
        inpArt.classList.remove("is-invalid")
    }
    if (!expreg.test(title)) {
        inpTit.classList.add("is-invalid")
        feedback1.innerHTML += "Song title is not valid<br>"
        valid = false
    } else {
        inpTit.classList.remove("is-invalid")
    }
    if (isNaN(duration) || duration <= 0) {
        inpLen.classList.add("is-invalid")
        feedback1.innerHTML += "Song length is not valid"
        valid = false
    } else {
        inpLen.value = parseInt(duration)
        inpLen.classList.remove("is-invalid")
    }
    if (valid) {
        addSong(artist,title,parseInt(duration))
        inpArt.value = ""
        inpTit.value = ""
        inpLen.value = ""
        inpArt.focus()
    }
})

inpSearch.addEventListener("keyup",function(ev){
    let pattern = inpSearch.value.trim()
    listSongList(songList.filter( s => s.artist.toLowerCase().includes(pattern) || s.title.toLowerCase().includes(pattern) ))
})
btnSearch.addEventListener("click",function(){
    let pattern = inpSearch.value.trim()
    listSongList(songList.filter( s => s.artist.toLowerCase().includes(pattern) || s.title.toLowerCase().includes(pattern) ))
})

btnSortArtist.addEventListener("click",function(){
    listSongList(songList.sort( (a,b) => {
        if (a.artist.toLowerCase() <= b.artist.toLowerCase()) return -1
        else return 1
    }))
    activateButton(this)
})
btnSortTitle.addEventListener("click",function(){
    listSongList(songList.sort( (a,b) => {
        if (a.title.toLowerCase() <= b.title.toLowerCase()) return -1
        else return 1
    }))
    activateButton(this)
})
btnSortLenInc.addEventListener("click",function(){
    listSongList(songList.sort( (a,b) => a.duration - b.duration ))
    activateButton(this)
})
btnSortLenDec.addEventListener("click",function(){
    listSongList(songList.sort( (a,b) => b.duration - a.duration ))
    activateButton(this)
})

btnDelete.addEventListener("click",function(){
    let index = inpDelete.value.trim()
    if (!isNaN(index) && index >= 1 && index <= songList.length) {
        songList.splice(index-1,1)
        inpDelete.value = ""
        listSongList(songList)
        inpDelete.classList.remove("is-invalid")
    } else {
        inpDelete.classList.add("is-invalid")
        if (songList.length) {
            feedback2.innerHTML = "Index is not valid: must be a number between 1 and " + songList.length + "."
        } else {
            feedback2.innerHTML = "Cannot delete song. List is already empty,"
        }
    }
})

function addSong(artist,title,duration) {
    songList.push({
        artist: artist,
        title: title,
        duration: duration
    })
    listSongList(songList)
}

function activateButton(button) {
    btnSortArtist.classList.replace("btn-secondary","btn-outline-secondary")
    btnSortTitle.classList.replace("btn-secondary","btn-outline-secondary")
    btnSortLenInc.classList.replace("btn-secondary","btn-outline-secondary")
    btnSortLenDec.classList.replace("btn-secondary","btn-outline-secondary")
    button.classList.replace("btn-outline-secondary","btn-secondary")
}

function listSongList(songList) {
    divSongList.innerHTML = ""
    songList.forEach( (s,index) => {
        divSongList.innerHTML += `${index+1}. <b>${s.artist}</b> - <i>${s.title}</i> (${secondsToMinutes(s.duration)})<br>`
    });
}

function secondsToMinutes(duration) {
    let minutes = parseInt(duration/60)
    let seconds = duration % 60
    return (minutes + ":" + (seconds < 10 ? "0" + seconds : seconds) )
}
/* Enunciado
parte obligatoria.
•	(1p) Al insertar canción, sólo admite:
    o	Título: al menos una letra (may/min/tildes) o número.
    o	Artista: ídem.
    o	Duración: entero positivo.
•	(1p) Se muestra listado completo de canciones y se puede filtrar por patrón.
•	(1p) Orden por artista (A-Z), por título (A-Z) y por duración (de menor a mayor y de mayor a menor).
•	(1p) Eliminación de 1 canción indicando el nº de canción en la lista.
•	(1p) Se inserta un número de segundos, pero la duración luego se muestra en formato mm:ss más legible.
•	(1p) La lista de canciones no se pierde al recargar porque se guarda en Local Storage.

parte opcional.
•	(1p) Al insertar canción:
    o	Informar al usuario si escribe datos no permitidos.
•	(1p) Al ordenar, el botón que establece el orden actual queda resaltado en gris, frente al resto que está en blanco.
•	(1p) Permite también modificar el título, el artista o la duración de una canción ya insertada.
•	(0,5p) La conversión de segundos en minutos se realiza con la función “map”.
•	(0,5p). Al listar, se muestra la longitud y la duración total de la lista de canciones y en formato mm:ss.
•	(1p) Simula la reproducción de una canción. Al iniciar la reproducción, se muestra un contador en formato mm:ss que va decrementándose cada segundo desde la duración de la canción hasta 0.

*/