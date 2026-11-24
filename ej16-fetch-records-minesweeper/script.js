const nickInput = document.querySelector("#nick")
const levelSelect = document.querySelector("#level")
const playButton = document.querySelector("#play")
const recordsTable = document.querySelector("#records")

// A PROGRAMAR SCRIPT...

levelSelect.addEventListener("change", function(){
    let levelChosen = levelSelect.value
    fetch("server/record_get.php?level=" + levelChosen)
    .then( response => response.json() )
    .then( data => alert(data) )

})