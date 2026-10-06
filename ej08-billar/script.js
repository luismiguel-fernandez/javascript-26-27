/**************************************************/
/* recuperar elementos del DOM y otras CONSTANTES */
/**************************************************/
const BOARD_WIDTH = 900
const BOARD_HEIGHT = 450
const BALL_DIAMETER = 30

const tableBoard = document.querySelector("#tableBoard")

const addBallBtn = document.querySelector("#addBallBtn")
const add10BallsBtn = document.querySelector("#add10BallsBtn")
const remBallBtn = document.querySelector("#remBallBtn")
const rem10BallsBtn = document.querySelector("#rem10BallsBtn")
const ballCounter = document.querySelector("#ballCounter")

/*********************/
/* código automático */
/*********************/
tableBoard.style.width = BOARD_WIDTH + "px"
tableBoard.style.height = BOARD_HEIGHT + "px"

const ball = document.createElement("DIV")
tableBoard.append(ball)
ball.classList.add("ball")

let posX = 0
let velX = 2
ball.style.left = posX + "px"

setInterval( moveBall, 10 )

/************************/
/* funciones auxiliares */
/************************/

function moveBall() {
    posX += velX
    ball.style.left = posX + "px"

    if ( posX >= (BOARD_WIDTH - BALL_DIAMETER) )
        velX = velX * (-1)
}
