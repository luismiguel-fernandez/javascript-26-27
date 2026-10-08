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

const balls = []

/*********************/
/* código automático */
/*********************/
balls.push( createBall() )

tableBoard.style.width = BOARD_WIDTH + "px"
tableBoard.style.height = BOARD_HEIGHT + "px"


setInterval( moveBall, 10 )

/************************/
/* funciones auxiliares */
/************************/

function createBall() {
    const ball = document.createElement("DIV")
    tableBoard.append(ball)
    ball.classList.add("ball")

    const newBall = new Ball(
        ball,
        Math.floor( Math.random() * (BOARD_HEIGHT-BALL_DIAMETER) ),
        Math.floor( Math.random() * (BOARD_WIDTH-BALL_DIAMETER) ),
        Math.random() * 6 - 3,   // velY
        Math.random() * 6 - 3,   // velX
        `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
    )
    return newBall
}

function moveBall() {
    posX += velX
    ball.style.left = posX + "px"
    if ( posX <= 0 || posX >= (BOARD_WIDTH - BALL_DIAMETER) )
        velX = velX * (-1)

    posY += velY
    ball.style.top = posY + "px"
    if ( posY <= 0 || posY >= (BOARD_HEIGHT - BALL_DIAMETER) )
        velY = velY * (-1)
}
