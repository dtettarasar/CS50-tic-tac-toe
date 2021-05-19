// initial variables

const popUp = document.querySelector("#pop-up");
const onePGameEasyBtn = document.querySelector("#play-1p-easy");
const onePGameDiffBtn = document.querySelector("#play-1p-difficult");
const twoPGameBtn = document.querySelector("#play-2p");
const cases = Array.from(document.querySelectorAll("[id^=case]"));
let gameFinished = false;
let chosenCases = [];
let difficultAi;

// this array store all the cases combinations that gives the victory
const victories = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
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

    this.victoryLookUp = function() {
        // check if a player got the victory
        // we check if a player got one of the possible winning set of choices
        for (let i = 0; i < victories.length; i++) {
            let vicChecker = victories[i].every(value => this.choices.includes(value));
            if (vicChecker) {
                this.gotVictory = vicChecker;
                break;
            }
        }
    }
}

// create the players
let playerOne = new Player(1, true, "circle", false);
let playerTwo = new Player(2, false, "cross", false);

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

function minimax(gameGridCopy, player, computer) {

    const availableCases = getAvailableCases();

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

function playerAiDifficult(computer, player) {
    console.log("todo");
    playersTurn();
}

// check result after a players's choice
function checkResult() {
    // check result, if a player won or if draw, each time after a player made a choice

    playerOne.victoryLookUp();
    playerTwo.victoryLookUp();

    if (playerOne.gotVictory) {
        console.log("player One win!");
        endGame();
    } else if (playerTwo.gotVictory) {
        console.log("player Two win!");
        endGame();
    } else if (chosenCases.length == 9) {
        console.log("Draw!");
        endGame();
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
        
        playerOne.recordChoices(index);
        playerOne.createSymbol(index);
        playersTurn();
        checkResult();

        if (playerTwo.turn && !playerOne.gotVictory && chosenCases.length < 9) {
            if (difficultAi) {
                playerAiDifficult(playerTwo, playerOne);
            } else {
                playerAiEasy(playerTwo);
            }
            checkResult();
        }

    }

}

// function to end the game
function endGame() {
    gameFinished = true;
    console.log("end of the game!");
}



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
    popUp.style.display = "none";
    loadCaseEvnt(playerNum);
}
    
onePGameEasyBtn.addEventListener("click", function() {
    difficultAi = false;
    startGame(1);
});

onePGameDiffBtn.addEventListener("click", function() {
    difficultAi = true;
    startGame(1);
});
    
twoPGameBtn.addEventListener("click", function() {
    difficultAi = false;
    startGame(2);
});