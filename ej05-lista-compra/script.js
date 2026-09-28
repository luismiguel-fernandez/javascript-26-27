const txtAdd = document.querySelector("#txtAdd")
const myList = document.querySelector("#myList")

//1. añadir una oreja para que la caja de texto escuche el intro
txtAdd.addEventListener("keyup", function(ev) {
    if (ev.key === "Enter") {
        //2. si es un intro y el usuario ha escrito algo, insertarlo en la lista y vaciar caja de texto        
        let anItem = txtAdd.value.trim()
        if (anItem.length > 0) addItemToList(anItem)
    } 
})





function addItemToList(item) {

}