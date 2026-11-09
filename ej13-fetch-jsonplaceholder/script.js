const btnGetUsers = document.querySelector("#btnGetUsers")
const tbodyUsers = document.querySelector("#tblUsers>tbody")
const btnGetPhoto = document.querySelector("#btnGetPhoto")
const imgPhoto = document.querySelector("img")


let users = []

btnGetUsers.addEventListener("click",function(){
    //intentar solicitud ASÍNCRONA a un recurso externo (backend)
    fetch("https://jsonplaceholder.typicode.com/users")
    .then( respuestaHTTP => respuestaHTTP.json() )
    .then( datos => {
        users = datos
        tbodyUsers.innerHTML = ""
        users.forEach( user => {
            let newTR = tbodyUsers.insertRow()
            let newTD1 = newTR.insertCell()
            let newTD2 = newTR.insertCell()
            let newTD3 = newTR.insertCell()
            let newTD4 = newTR.insertCell()
            newTD1.textContent = user.id
            newTD2.textContent = user.name
            newTD3.textContent = user.email
            newTD4.textContent = user.company.name
        });
    } )
})

btnGetPhoto.addEventListener("click", function(){
    fetch("https://jsonplaceholder.typicode.com/photos/1")
    .then( resp => resp.json() )
    .then( foto => {
        imgPhoto.src = foto.thumbnailUrl
    })
})
