//código JS
const URL_base = "https://www.omdbapi.com/?apikey=1171f65e"

const searchInput = document.getElementById("searchInput")
const resultsList = document.getElementById("resultsList")

const movieTitle = document.getElementById("movieTitle")
const modalBodyDetails = document.getElementById("modalBodyDetails")
const modalBodyPoster = document.getElementById("modalBodyPoster")

let delay
let cache = [] //diccionario de consultas previas para ahorrar fetches

searchInput.addEventListener("input", function(){
    let word = searchInput.value.trim().toLowerCase()
    resultsList.innerHTML = ""
    if (word.length >= 1) {
        clearTimeout(delay)
        delay = setTimeout( function(){searchByWord(word)} , 1000 )
    }
})

function searchByWord(word) {
    if (cache[word]) {
        showSearchResults(cache[word])
    }
    else {
        //Aquí ya se lanza la consulta a la API pública (backend gratuito omdbapi.com)
        fetch(URL_base + "&s=" + word)
        .then( response => response.json() )
        .then( data => {
            if (data.Search) {
                showSearchResults(data)
                cache[word] = data
                console.log(cache)
            }
        })
        //.catch(error => console.log(error))
    }
}

function searchById(id){
    fetch(URL_base + "&i=" + id)
    .then( paqueteAmazon => paqueteAmazon.json() )
    .then( filmDetails => {
        //actualizamos el modal con la peli clicada
        movieTitle.textContent = filmDetails.Title
        modalBodyDetails.innerHTML = `
            <p>Year: ${filmDetails.Year}</p>
            <p>Type: ${filmDetails.Type}</p>
            <p>Director: ${filmDetails.Director}</p>
            <p>Plot: ${filmDetails.Plot}</p>
            <p><a target="_blank" href="https://www.imdb.com/es-es/title/${filmDetails.imdbID}">Link to IMDB</a></p>
        `
        modalBodyPoster.innerHTML = `
            <img src="${filmDetails.Poster}" class="img-fluid">
        `
    })
}

function showSearchResults(data) {
    data.Search.forEach( r => {
        //crear un LI y un BUTTON para cada resultado r
        const newLI = document.createElement("LI")
        newLI.classList.add("list-group-item")
        const newButton = document.createElement("Button")
        newLI.append(newButton)
        newButton.classList.add("btn","btn-outline-primary")
        newButton.textContent = `${r.Title} (${r.Year})`
        newButton.setAttribute("data-bs-toggle","modal")
        newButton.setAttribute("data-bs-target","#exampleModal")
        resultsList.append(newLI)

        //al clicar el boton de una peli se abre el modal con info de la peli
        newButton.addEventListener("click",function(){
            searchById(r.imdbID)
        })
    } )
}