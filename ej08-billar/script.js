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
balls.push( createBall() )
balls.push( createBall() )

tableBoard.style.width = BOARD_WIDTH + "px"
tableBoard.style.height = BOARD_HEIGHT + "px"

setInterval( moveBalls, 10 )

/************************/
/* funciones auxiliares */
/************************/

function createBall() {
    const ball = document.createElement("DIV")
    ball.classList.add("ball")

    const newBall = new Ball(
        ball,
        Math.floor( Math.random() * (BOARD_HEIGHT-BALL_DIAMETER) ), //posX
        Math.floor( Math.random() * (BOARD_WIDTH-BALL_DIAMETER) ),  //posY
        Math.random() * 6 - 3,   // velY
        Math.random() * 6 - 3,   // velX
        `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
    )

    ball.style.top = newBall.posY + "px"
    ball.style.left = newBall.posX + "px"
    ball.style.backgroundColor = newBall.color

    tableBoard.append(ball)
    return newBall
}

function moveBalls() {
    balls.forEach( b => {
        b.posX += b.velX
        b.refDiv.style.left = b.posX + "px"
        if ( b.posX <= 0 || b.posX >= (BOARD_WIDTH - BALL_DIAMETER) )
            b.velX = b.velX * (-1)
        b.posY += b.velY
        b.refDiv.style.top = b.posY + "px"
        if ( b.posY <= 0 || b.posY >= (BOARD_HEIGHT - BALL_DIAMETER) )
            b.velY = b.velY * (-1)
    } )
}
