'use strict'
//variables

var beginBoard;
const humPlayer = 'o';
const aiPlayer = 'x';

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cells = document.querySelectorAll('.cell');

//reset function
function startGame() {
    document.querySelector('.endgame').style.display = 'none';
    beginBoard = Array.from(Array(9).keys()); //this is a fance way to interact with array
    // console.log(beginBoard)
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].removeAttribute('style')
        cells[i].addEventListener('click', turnClick, false);
    }
}

//collect and send info
function turnClick(eventId) {
    turnCurrentNumber(eventId.target.id, humPlayer);
}

//currente id and player
function turnCurrentNumber(id, player) {
    beginBoard[id] = player;
    document.getElementById(id).innerText = player;
    let gameWon = checkWin(beginBoard, player);
    if (gameWon) gameOver(gameWon);
}


//check who win function
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;

    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {
                index: index,
                player: player
            }
            break;
        }
    }

    return gameWon;
}

//gameover function
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == humPlayer ? 'blue' : 'red';
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
}

//DOCUMENT LOADED
window.addEventListener('load', () => {
    startGame();

})