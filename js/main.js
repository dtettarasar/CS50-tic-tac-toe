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
    this.minimaxChoices = [];
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

    this.victoryLookUp = function(choicesArr = this.choices, minimaxTest = false) {
        // check if a player got the victory
        // we check if a player got one of the possible winning set of choices
        for (let i = 0; i < victories.length; i++) {
            let vicChecker = victories[i].every(value => choicesArr.includes(value));
            if (vicChecker && !minimaxTest) {
                this.gotVictory = vicChecker;
                return this.gotVictory;
            } else if (vicChecker && minimaxTest) {
                // the minimaxTest path will be used in minimax() to test choices
                const resultAi = vicChecker;
                return resultAi;
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

function cleanMiniMaxChoices() {
    playerOne.minimaxChoices = [];
    playerTwo.minimaxChoices = [];
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

function minimax(board, testChoice, aiTurn, depth, firstExec) {

    let testCpuVictory;
    let testPlayerVictory;

    if (firstExec) {
        playerOne.minimaxChoices = [...playerOne.choices];
        playerTwo.minimaxChoices = [...playerTwo.choices];
    }

    if (aiTurn && !playerTwo.minimaxChoices.includes(testChoice)) {

        playerTwo.minimaxChoices.push(testChoice);
        testCpuVictory = playerTwo.victoryLookUp(playerTwo.minimaxChoices, true);
        //playerTwo.minimaxChoices.pop();

    } else if (!playerOne.minimaxChoices.includes(testChoice)) {

        playerOne.minimaxChoices.push(testChoice);
        testPlayerVictory = playerOne.victoryLookUp(playerOne.minimaxChoices, true);
        //playerOne.minimaxChoices.pop();
    }

    //console.log(playerTwo.minimaxChoices);
    
    let boardCopy = board;

    //console.log(boardCopy);

    const choiceResult = {
        index: testChoice
    };

    if (testCpuVictory && aiTurn) {
        choiceResult.score = 10;
        return choiceResult;
    } else if (testPlayerVictory && !aiTurn) {
        choiceResult.score = -10;
        return choiceResult;
    } else if (boardCopy.length == 0) {
        choiceResult.score = 0;
        return choiceResult;
    }

    /*
    if (aiTurn) {

        let bestScore = -Infinity;
        for (let i = 0; i < boardCopy.length; i++) {
            let testScore = minimax(boardCopy, boardCopy[i], false, depth + 1, false);
            //console.log(boardCopy);
            bestScore = max(testScore, bestScore);
        }
        return choiceResult;

    } else {

        let bestScore = Infinity;
        for (let i = 0; i < boardCopy.length; i++) {
            let testScore = minimax(boardCopy, boardCopy[i], true, depth + 1, false);
            //console.log(boardCopy);
            bestScore = min(testScore, bestScore);
        }

        return choiceResult;
    }*/

    console.log(choiceResult);

    return choiceResult;

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

function playerAiDifficult() {

    const availableCases = getAvailableCases();
    let index = availableCases[0];
    let testResult;
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < availableCases.length; i++) {
        testResult = minimax(availableCases, availableCases[i], false, 0, true);
        if (testResult.score > bestScore) {
            bestScore = testResult.score;
            bestMove = availableCases[i];
        }
        //console.log(testResult);
    }

    console.log(bestScore);
    console.log(bestMove);

    playerTwo.recordChoices(index);
    playerTwo.createSymbol(index);

    cleanMiniMaxChoices();
    playersTurn();
}

// check result after a players's choice
function checkResult() {
    // check result, if a player won or if draw, each time after a player made a choice

    playerOne.victoryLookUp();
    playerTwo.victoryLookUp();

    //console.log(playerOne.gotVictory);
    //console.log(playerTwo.gotVictory);

    //victory lookup test with "Ai mode"
    //console.log(playerTwo.victoryLookUp([2,0,1], true));

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
                playerAiDifficult();
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