//crear referencias a los elementos HTML que queremos manipular
const btnLeft = document.querySelector("#btnLeft")
const btnRight = document.querySelector("#btnRight")
const img = document.querySelector("#img")

const path = "img/"
const images = ["foca.webp", "lobo.jpg", "oso.webp", "pinguino.webp"]

//inicializar con una imagen aleatoria o elegida
let currentImg = 1

btnLeft.addEventListener("click", switchImgLeft )
btnRight.addEventListener("click", switchImgRight )
//btnRight.addEventListener("click", ()=>switchImgRight() )
//btnRight.addEventListener("click", function(){switchImgRight()} )

document.addEventListener("keyup", function(e){
    if (e.key == "ArrowLeft") {
        switchImgLeft()
    } else if (e.key == "ArrowRight") {
        switchImgRight()
    }
})

function switchImgLeft() {
    currentImg = (--currentImg + images.length) % images.length //esto hace que siempre valga entre 0 y 3
    img.src = path + images[currentImg]
}

function switchImgRight() {
    currentImg = ++currentImg % images.length //esto hace que siempre valga entre 0 y 3
    img.src = path + images[currentImg]
}
