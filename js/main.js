// initial variables

const popUp = document.querySelector("#pop-up");
const onePGameEasyBtn = document.querySelector("#play-1p-easy");
const onePGameDiffBtn = document.querySelector("#play-1p-difficult");
const twoPGameBtn = document.querySelector("#play-2p");
const playAgainBtn = document.querySelector("#play-again");
const changGameBtn = document.querySelector("#cg-game");
const cases = Array.from(document.querySelectorAll("[id^=case]"));
const popUpSubTitle = document.querySelector("#pop-up-sub-title");
const scoreSection = document.querySelector(".score-section");
const gamesPlayedContainer = document.querySelector("#num-game-played");
const playerOneScoreContainer = document.querySelector(".player-score-1");
const playerTwoScoreContainer = document.querySelector(".player-score-2");
let gameFinished;
let chosenCases = [];
let difficultAi;
let gameModeSelected;
let numOfGamePlayed = 0;

// this array store all the cases combinations that gives the victory
const victories = [
    [0,3,6],
    [6,7,8],
    [3,4,5],
    [0,1,2],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// constructor for the players
function Player(number, turn, symbol, gotVictory) {
        
    this.number = number;
    this.turn = turn;
    this.symbol = symbol;
    this.choices = [];
    this.gotVictory = gotVictory;
    this.score = 0;

    this.createSymbol = function(caseId) {
        const imgElem = document.createElement("img");
        const imgLink = "/img/" + this.symbol + ".svg";
        imgElem.setAttribute("src", imgLink);
        imgElem.classList.add("symbol");
        cases[caseId].appendChild(imgElem);
    }

    this.recordChoices = function(caseId) {
        // make sure a player make a choice only once
        if (!chosenCases.includes(caseId)) {
            this.choices.push(caseId);
            chosenCases.push(caseId);
        }
    }

    this.updateTurn = function() {
        this.turn = !this.turn;
    }

    this.victoryLookUp = function(minimaxTest = false) {
        // check if a player got the victory
        // we check if a player got one of the possible winning set of choices
        for (let i = 0; i < victories.length; i++) {
            let vicChecker = victories[i].every(value => this.choices.includes(value));
            if (vicChecker) {
                this.gotVictory = vicChecker;
                return this.gotVictory;
            }
        }
    }
}

// create the players
let playerOne = new Player(1, true, "circle", false);
let playerTwo = new Player(2, false, "cross", false);

// hide the button we'll need after the first game, for now
playAgainBtn.style.display = "none";
changGameBtn.style.display = "none";

function playersTurn() {
    playerOne.updateTurn();
    playerTwo.updateTurn();
}

function getAvailableCases() {

    const availableCases = [];

    for (let i = 0; i < 9;i++){
        if (!chosenCases.includes(i)) {
            availableCases.push(i);
        }
    }

    return availableCases;
}

function playerAiEasy(computer) {

    // write the function for the AI (easy version)

    const availableCases = getAvailableCases();
    const random = Math.floor(Math.random() * availableCases.length);

    if (!gameFinished) {
        computer.recordChoices(availableCases[random]);
        computer.createSymbol(availableCases[random]);
    }

    playersTurn();
}

function getCurrentBoard() {

    currentBoard = [];

    for (let i = 0; i < 9; i++) {

        let caseInfo = {
            caseId: i,
            playerNumber: 0
        }

        if (playerOne.choices.includes(i)) {
            caseInfo.playerNumber = playerOne.number;
        } else if (playerTwo.choices.includes(i)) {
            caseInfo.playerNumber = playerTwo.number;
        } 

        currentBoard.push(caseInfo);

    }

    return currentBoard;

}

function checkWinner(board) {

    let playerOneChoices = [];
    let playerTwoChoices = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i].playerNumber == 1) {
            playerOneChoices.push(board[i].caseId);
        } else if (board[i].playerNumber == 2) {
            playerTwoChoices.push(board[i].caseId);
        }

    }

    function victoryTester(array) {
        for (let i = 0; i < victories.length; i++) {
            let vicChecker = victories[i].every(value => array.includes(value));
            if (vicChecker) {
                return vicChecker;
            }
        }
        return false;
    }

    const playerOneVic = victoryTester(playerOneChoices);
    const playerTwoVic = victoryTester(playerTwoChoices);
    const testTie = board.every(item => item.playerNumber !== 0);

    if (playerOneVic) {
        return 1;
    } else if (playerTwoVic) {
        return 2;
    }   else if (testTie) {
        return 0;
    }

}

/**
Minimax function for the difficult AI mode.
Based on the tutorial: 

Tic Tac Toe AI with Minimax Algorithm
The Coding Train / Daniel Shiffman
https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
https://www.youtube.com/watch?v=trKjYdBASyQ
https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD
Repos: https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_154_Tic_Tac_Toe_Minimax/P5
**/

function minimax(board, aiTurn) {

    //console.log(JSON.parse(JSON.stringify(board)));
    let result = checkWinner(board);

    if (result == 2) {
        return 10;
    } else if (result == 1) {
        return -10;
    } else if (result == 0) {
        return 0;
    }

    if (aiTurn) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if(board[i].playerNumber == 0) {
                board[i].playerNumber = 2;
                let score = minimax(board, false);
                board[i].playerNumber = 0;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = currentBoard[i].caseId;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if(board[i].playerNumber == 0) {
                board[i].playerNumber = 1;
                let score = minimax(board, true);
                board[i].playerNumber = 0;
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = currentBoard[i].caseId;
                }
            }
        }
        return bestScore;
    }

}

function getBestMove() {

    let bestScore = -Infinity;
    let bestMove;
    let currentBoard = getCurrentBoard();
    
    for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i].playerNumber == 0) {

            // if the case is available : the ai test the choice of this case
            currentBoard[i].playerNumber = 2;
            let score = minimax(currentBoard, false);
            currentBoard[i].playerNumber = 0;

            // if it gets a better score, save the score and the case for the upcoming move
            if (score > bestScore) {
                bestScore = score;
                bestMove = currentBoard[i].caseId;
            }
        }

    }

    return bestMove;
}

function playerAiDifficult() {

    const availableCases = getAvailableCases();
    let index = availableCases[0];

    const bestMove = getBestMove();

    if (bestMove) {
        index = bestMove;
    }

    playerTwo.recordChoices(index);
    playerTwo.createSymbol(index);

    playersTurn();
}

// check result after a players's choice
function checkResult() {
    // check result, if a player won or if draw, each time after a player made a choice

    playerOne.victoryLookUp();
    playerTwo.victoryLookUp();

    if (playerOne.gotVictory) {
        playerOne.score++;
        endGame();
        popUpSubTitle.innerHTML = "Circle win!";
        setTimeout(() => {
            popUp.style.display = "block";
        }, 1500);
    } else if (playerTwo.gotVictory) {
        playerTwo.score++;
        endGame();
        popUpSubTitle.innerHTML = "Cross win!";
        setTimeout(() => {
            popUp.style.display = "block";
        }, 1500);
    } else if (chosenCases.length == 9) {
        endGame();
        popUpSubTitle.innerHTML = "Draw!";
        setTimeout(() => {
            popUp.style.display = "block";
        }, 1500);
    }

}

function handleChoice(index, playerNum) {
    // handle player's choice & turns

    if (playerNum == 2) {

        if (playerOne.turn && !chosenCases.includes(index)) {
            playerOne.recordChoices(index);
            playerOne.createSymbol(index);
            playersTurn();
            checkResult();
    
        } else if (playerTwo.turn && !chosenCases.includes(index)) {
            playerTwo.recordChoices(index);
            playerTwo.createSymbol(index);
            playersTurn();
            checkResult();
        }

    } else if (playerNum == 1) {
        
        if (playerOne.turn && !chosenCases.includes(index)) {
            playerOne.recordChoices(index);
            playerOne.createSymbol(index);
            playersTurn();
            checkResult();
        }

        if (playerTwo.turn && !playerOne.gotVictory && chosenCases.length < 9) {
            if (difficultAi) {
                playerAiDifficult();
            } else {
                playerAiEasy(playerTwo);
            }
            checkResult();
        }

    }

}


function cleanGame() {
    // todo
    chosenCases = [];
    playerOne.choices = [];
    playerTwo.choices = [];
    playerOne.gotVictory = false;
    playerTwo.gotVictory = false;
    playerOne.turn = true;
    playerTwo.turn = false;

    let symbolArr = Array.from(document.querySelectorAll(".symbol"));
    for (let i = 0; i < symbolArr.length; i++) {
        symbolArr[i].remove();
    }
}


// function to end the game
function endGame() {
    gameFinished = true;
    numOfGamePlayed++;

    onePGameEasyBtn.style.display = "none";
    onePGameDiffBtn.style.display = "none";
    twoPGameBtn.style.display = "none";
    playAgainBtn.style.display = "block";
    changGameBtn.style.display = "block";
    scoreSection.style.display = "block";

    gamesPlayedContainer.innerHTML = numOfGamePlayed;
    playerOneScoreContainer.innerHTML = playerOne.score;
    playerTwoScoreContainer.innerHTML = playerTwo.score;

}

// TO DO : update the function to handle multiple games
function loadCaseEvnt(playerNum) {
    for(let i=0; i< cases.length; i++) {
        cases[i].addEventListener("click", function casesEvent() {
            if (!gameFinished) {
                handleChoice(i, playerNum);
            }
        });
    }
}
    
function startGame(playerNum) {

    gameFinished = false;
    popUp.style.display = "none";

    loadCaseEvnt(playerNum);
}

function restartGame() {

    if (gameModeSelected == 1) {
        difficultAi = false;
        cleanGame();
        startGame(1);
    } else if (gameModeSelected == 2) {
        difficultAi = true;
        cleanGame();
        startGame(1);
    } else if (gameModeSelected = 3) {
        difficultAi = false;
        cleanGame();
        startGame(2);
    }

}
    
onePGameEasyBtn.addEventListener("click", () => {
    difficultAi = false;
    gameModeSelected = 1;
    startGame(1);
});

onePGameDiffBtn.addEventListener("click", () => {
    difficultAi = true;
    gameModeSelected = 2;
    startGame(1);
});
    
twoPGameBtn.addEventListener("click", () => {
    difficultAi = false;
    gameModeSelected = 3;
    startGame(2);
});

playAgainBtn.addEventListener("click", () => {
    restartGame();
});

changGameBtn.addEventListener("click", () => {
    location.reload();
});