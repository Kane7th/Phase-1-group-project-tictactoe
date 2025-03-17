// the game takes two players - the user (x) and computer (o)
// A win is when the X's or 0's are in one row or column, otherwise, it's a draw

let boxes; //storing the individual clickable boxes
let boardArray = ['', '', '', '', '', '', '', '', ''] //empty strings on 3*3 grid
let gameOn = true; //to stop the game after a win/draw
let xScores = 0; //track player x' wins
let oScores = 0; //player o' wins

const winCases = [ //Possible ways of winning 
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

//ensure doc loading, loop over boxes, add event listeners 
document.addEventListener('DOMContentLoaded', () => {
    boxes = document.querySelectorAll('.box');
    const playAgain = document.getElementById('restart');

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const index = parseInt(box.getAttribute('data-index'));
            playerSelection(box, index);
        })
    })
    playAgain.addEventListener('click', resetGame);
})

//initializing the  game
    // user end
function playerSelection(box, index) {       //Is the box empty and game active?
    if (boardArray[index] === '' && gameOn) {
        boardArray[index] = 'X';
        box.textContent = 'X';
        if (confirmEndedGame ()) return;
        simulatedMove();
    }
}
    // computer end 
function simulatedMove() {
    let emptybox = []
    for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === '') emptybox.push(i);
    }

    if (emptybox.length > 0 && gameOn) {
        const randomBoxIndex = emptybox[Math.floor(Math.random() * emptybox.length)]
        boxes[randomBoxIndex].textContent = 'O';
        boardArray[randomBoxIndex] = 'O'
        confirmEndedGame();
    }
}

// Checking for wins and updating scores
function confirmEndedGame() {
    if (checkWin('X')) {
        xScores++;
        updateScoringCard();
        alert('X has Won!');
        gameOn = false;
        return true
    } else if (checkWin('O')) {
        oScores++;
        updateScoringCard();
        alert('O has Won!');
        gameOn = false;
        return true;
    } else if (boardArray.every(cell => cell !== '')) {
        alert('Draw!');
        gameOn = false;
        return true
    }
    return false
}

function checkWin(player) { //loops through the wincases to find a winner line
    return winCases.some(scenario => {
        return scenario.every(index => boardArray[index] === player);
    })
}

//update the scores
function updateScoringCard() {
    const winnerScores = document.querySelectorAll('#scoring-card .score span');

    winnerScores[0].textContent = xScores;
    winnerScores[1].textContent = oScores;
}

function resetGame() {
    boardArray = ['', '', '', '', '', '', '', '', '']
    gameOn = true;
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.textContent = '')
}
