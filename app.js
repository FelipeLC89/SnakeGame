import { update as updateSnake, draw as drawSnake, VELOCIDADE, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('tabuleiro')


function main(currentTime) {
    if(gameOver) {
        if(confirm('Você perdeu... Aperte OK para reiniciar!')){
            window.location = '/'
        }
        return
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) /1000
    if (secondsSinceLastRender < 1 / VELOCIDADE) return

    lastRenderTime = currentTime

    update()
    draw()
    
}

window.requestAnimationFrame(main);

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}