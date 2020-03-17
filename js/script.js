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
function startGame(){
    document.querySelector('.endgame').style.display = 'none';
    beginBoard = Array.from(Array(9).keys());
    // console.log(beginBoard)
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].classList.remove('background-color');
        cells[i].addEventListener('click',turnClick, false);
    }
}

//collect and send info
function turnClick(eventId){
    turnCurrentNumber(eventId.target.id, humPlayer);
}

//currente id and player
function turnCurrentNumber(id,player){
    beginBoard[id] = player;
    document.getElementById(id).innerText = player
}





//DOCUMENT LOADED
window.addEventListener('load',()=>{
    startGame();
    
})