let popUp = document.querySelector("#pop-up");
let onePGameBtn = document.querySelector("#play-1p");
let twoPGameBtn = document.querySelector("#play-2p");
let cases = Array.from(document.querySelectorAll("[id^=case]"));
let gameFinished = false;
let chosenCases = [];

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

function handleChoice(index, playerNum) {
    // handle player's choice & turns

    if (playerOne.turn && !chosenCases.includes(index)) {
        playerOne.recordChoices(index);
        playerOne.createSymbol(index);
        playersTurn();

    } else if (!chosenCases.includes(index) && playerNum == 2) {
        playerTwo.recordChoices(index);
        playerTwo.createSymbol(index);
        playersTurn();

    } else if (!chosenCases.includes(index) && playerNum == 1) {
        // write the function for the AI
        console.log("todo");
        playersTurn();
    }

}

// function to end the game
function endGame() {
    gameFinished = true;
    console.log("end of the game!");
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

function loadCaseEvnt(playerNum) {
    for(let i=0; i< cases.length; i++) {
        cases[i].addEventListener("click", function casesEvent() {
            if (!gameFinished) {
                handleChoice(i, playerNum);
                checkResult();
            }
        });
    }
}
    
function startGame(playerNum) {
    popUp.style.display = "none";
    loadCaseEvnt(playerNum);
}
    
onePGameBtn.addEventListener("click", function() {
    startGame(1);
});
    
twoPGameBtn.addEventListener("click", function() {
    startGame(2);
});