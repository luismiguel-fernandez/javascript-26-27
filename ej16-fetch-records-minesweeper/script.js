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
    fetch("server/chat_select_get_json.php?ultimo=" + ultimoID)
    .then( respuesta => respuesta.json() )
    .then( mensajes => {
        mensajes.forEach( m => {
            chat.innerHTML += `<div class="mensaje">
                                  <b>${m.nick} dijo:</b>
                                  <br>
                                  <span>${m.texto}</span>
                               </div>`
            ultimoID = m.id
            chat.scrollTop = chat.scrollHeight
        })
    })
}

/*

[
    {"id":1,"nick":"luismi","texto":"hola","fecha":"2026-11-19 10:43:33"},
    {"id":2,"nick":"fernando","texto":"que tal","fecha":"2026-11-19 10:46:33"},
    {"id":3,"nick":"Luismi","texto":"muy bien","fecha":"2026-11-19 12:02:21"},
    {"id":4,"nick":"Hola","texto":"Hoal","fecha":"2026-11-19 12:04:01"},
    {"id":5,"nick":"David","texto":"Soy el macmaster","fecha":"2026-11-19 12:15:01"},
    {"id":6,"nick":"luisim","texto":"asdsdgf","fecha":"2026-11-23 12:33:36"}
]

*/