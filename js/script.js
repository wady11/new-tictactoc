'use strict';
 
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
    beginBoard = Array.from(Array(9).keys()); //this is a fancy way to interact with array
    // console.log(beginBoard)
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].removeAttribute('style')
        cells[i].addEventListener('click', turnClick, false);
    }
}

//collect and send info
function turnClick(eventId) {
    if (typeof beginBoard[eventId.target.id] == 'number') {
        turnCurrentNumber(eventId.target.id, humPlayer);
        if (!checkTie()) turnCurrentNumber(bestSpot(), aiPlayer);
    }

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
    declareWinner(gameWon.player == humPlayer ? 'you win!' : 'you lose!')
}

function declareWinner(who) {
    console.log(who)
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = who;
}

function emptySquare() {
    return beginBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(beginBoard, aiPlayer).index;
}

function checkTie() {
    if (emptySquare().length == 0) {
        let movement = 0;
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'green';
            cells[i].addEventListener('click', turnClick, false)
            movement++;
        }
         declareWinner('Tie Game');
               
        return true;
    }
    return false;

}

//calculate each move
function machineMoves(newBoard, availSpots, player) {
    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player

        if (player == aiPlayer) {
            let result = minimax(newBoard, humPlayer);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    return moves;
}

//calculte de score
function minimax(newBoard, player) {
    var availSpots = emptySquare(newBoard);
    if (checkWin(newBoard, player)) {
        return {
            score: -10
        };
    } else if (checkWin(newBoard, aiPlayer)) {
        return {
            score: 20
        }
    } else if (availSpots.length === 0) {
        return {
            score: 0
        };
    }

    
    let machineMoverVariable = machineMoves(newBoard, availSpots, player);

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -100;
        for (let i = 0; i < machineMoverVariable.length; i++) {
            if (machineMoverVariable[i].score > bestScore) {
                bestScore = machineMoverVariable[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 100;
        for (let i = 0; i < machineMoverVariable.length; i++) {
            if (machineMoverVariable[i].score < bestScore) {
                bestScore = machineMoverVariable[i].score;
                bestMove = i;
            }
        }
    }

    return machineMoverVariable[bestMove];
}

//DOCUMENT LOADED
window.addEventListener('load', () => {
    startGame();

})