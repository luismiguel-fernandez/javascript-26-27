const txtAdd = document.querySelector("#txtAdd")
const btnAdd = document.querySelector("#btnAdd")
const myList = document.querySelector("#myList")
const myCart = document.querySelector("#myCart")

const btnSelAll = document.querySelector("#btnSelAll")
const btnSelNot = document.querySelector("#btnSelNot")
const btnInvSel = document.querySelector("#btnInvSel")
const btnMovSel = document.querySelector("#btnMovSel")
const btnDelSel = document.querySelector("#btnDelSel")

const btnEmpCar = document.querySelector("#btnEmpCar")

//1. añadir una oreja para que la caja de texto escuche el intro
txtAdd.addEventListener("keyup", function(ev) {
    if (ev.key === "Enter") {
        //2. si es un intro y el usuario ha escrito algo, insertarlo en la lista y vaciar caja de texto        
        let anItem = txtAdd.value.trim()
        if (anItem.length > 0) {
            addItemToList(anItem)
            txtAdd.value = ""
        }
    }
})


btnAdd.addEventListener("click", function(){
    let anItem = txtAdd.value.trim()
    if (anItem.length > 0) {
        addItemToList(anItem)
        txtAdd.value = ""
        txtAdd.focus()
    }  
})

function addItemToList(item) {
    const newLI = document.createElement("LI")
    newLI.textContent = item
    myList.append(newLI)
    //sensible a los clics para alternar entre "seleccionado" o "no seleccionado"
    newLI.addEventListener("click",function(){
        newLI.classList.toggle("seleccionado")
        // Equivale a estas 4 lineas
        /*
        if (newLI.classList.contains("seleccionado"))
            newLI.classList.remove("seleccionado")
        else
            newLI.classList.add("seleccionado")
        */
    })
}

btnSelAll.addEventListener("click", function(){
    myList.querySelectorAll("li").forEach( li => li.classList.add("seleccionado") )
    //más eficiente que la de abajo
    //document.querySelectorAll("#myList li").forEach( li => li.classList.add("seleccionado") )
    
    //equivale a las 4 siguientes
    /*
    const todosLosLI = document.querySelectorAll("#myList li")
    todosLosLI.forEach( function(li){
        li.classList.add("seleccionado")
    })
    */
    //alternativa con el uso de "children" y un "for" clásico (no funciona en este caso "foreach")
    /*
    const todosLosLI = myList.children
    for (let i= 0; i<todosLosLI.length; i++)
            todosLosLI[i].classList.add("seleccionado")
    */
})
btnSelNot.addEventListener("click", function(){
    document.querySelectorAll("#myList li").forEach( li => li.classList.remove("seleccionado") )
})
btnInvSel.addEventListener("click", function(){
    document.querySelectorAll("#myList li").forEach( li => li.classList.toggle("seleccionado") )
})
btnMovSel.addEventListener("click", function(){
    document.querySelectorAll("#myList li.seleccionado").forEach( li => {
        //crear un nuevo LI para la lista myCart
        const newLI = document.createElement("LI")
        newLI.textContent = li.textContent
        myCart.append(newLI)
        //borra el LI original, el de myList
        li.remove()
    })
})
btnDelSel.addEventListener("click", function(){
    document.querySelectorAll("#myList li.seleccionado").forEach( li => li.remove() )
})

btnEmpCar.addEventListener("click", function(){
    myCart.innerHTML = ""
    //document.querySelectorAll("#myCart li").forEach( li => li.remove() )
})
