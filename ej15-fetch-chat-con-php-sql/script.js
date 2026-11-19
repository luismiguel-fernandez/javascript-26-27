const chat = document.querySelector("#chat")
const nick = document.querySelector("#nick")
const teclado = document.querySelector("#teclado")
const enviar = document.querySelector("#enviar")

enviar.addEventListener("click", function () {
    let nickValue = nick.value.trim().replace("<","")
    let mensaje = teclado.value.trim().replace("<","")
    if (nickValue.length == 0 || mensaje.length == 0) {
        alert ("Nick y mensaje deben tener longitud mayor o igual a 1")
        return
    }

    //INSERCIÓN EN BASE DE DATOS
    let opciones = {
        method: "POST",
        body: new URLSearchParams("nick=" + nickValue + "&mensaje=" + mensaje)
    }
    fetch("server/chat_insert_post.php",opciones)
    .then( respuesta => {
        //si el php devuelve algo tras insertar, tratamos la respuesta aquí
    })

    //VACIAR EL CAMPO PARA ESCRIBIR MÁS MENSAJES RÁPIDAMENTE
    teclado.value = ""

})

let consultador = setInterval( consultarNuevosMensajes , 1000 )
let ultimoID = 0

function consultarNuevosMensajes(){
    fetch("server/chat_get_json.php?ultimo=" + ultimoID)
    .then( respuesta => respuesta.json() )
    .then( mensajes => {
        mensajes.foreach( m => {
            
        })
    })
}