//código JS
const URL_base = "https://www.omdbapi.com/?apikey=1171f65e&s="

const searchInput = document.getElementById("searchInput")
const resultsList = document.getElementById("resultsList")

searchInput.addEventListener("input", function(){
    let word = searchInput.value.trim()
    resultsList.innerHTML = ""
    if (word.length >= 1) {
        searchByWord(word)
    }
})

function searchByWord(word) {
    //Aquí ya se lanza la consulta a la API pública (backend gratuito omdbapi.com)
    fetch(URL_base + word)
    .then( response => response.json() )
    .then( data => {
        if (data.Search) {
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
                    //actualizamos el modal con la peli clicada
                    const movieTitle = document.getElementById("movieTitle")
                    const modalBodyDetails = document.getElementById("modalBodyDetails")
                    const modalBodyPoster = document.getElementById("modalBodyPoster")
                    movieTitle.textContent = r.Title
                    modalBodyDetails.innerHTML = `
                        <p>Year: ${r.Year}</p>
                        <p>Type: ${r.Type}</p>
                        <p><a target="_blank" href="https://www.imdb.com/es-es/title/${r.imdbID}">Link to IMDB</a></p>
                    `
                    modalBodyPoster.innerHTML = `
                        <img src="${r.Poster}" class="img-fluid">
                    `
                })
            } )
        }
    })
    //.catch()
}