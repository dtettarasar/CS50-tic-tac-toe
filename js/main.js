function mainScript() {

    let popUp = document.querySelector("#pop-up");
    let onePGameBtn = document.querySelector("#play-1p");
    let twoPGameBtn = document.getElementById("play-2p");
    let cases = Array.from(document.querySelectorAll("[id^=case]"));
    let chosenCases = [];

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

    //constructor for the players
    function Player(number, turn, symbol) {
        this.number = number;
        this.turn = turn;
        this.symbol = symbol;
        this.choices = [];
        this.addSymbol = function(caseId) {

            // make sure a player doesn't make a choice only once
            if (!chosenCases.includes(caseId)) {
                this.choices.push(caseId);
                chosenCases.push(caseId);
            }

            console.log("player " + this.number + " choices:");
            console.log(this.choices);
            console.log("chosen cases");
            console.log(chosenCases);
        }
        this.updateTurn = function() {
            this.turn = !this.turn;
        }
    }

    // create the players
    let playerOne = new Player(1, true, "circle");
    let playerTwo = new Player(2, false, "cross");

    function playersTurn() {
        playerOne.updateTurn();
        playerTwo.updateTurn();
    }

    // handle a game
    function handleChoice(index) {
        // handle player's choice & turns

        if (playerOne.turn && !chosenCases.includes(index)) {
            playerOne.addSymbol(index);
            playersTurn();

        } else if (!chosenCases.includes(index)) {
            playerTwo.addSymbol(index);
            playersTurn();
        }

    }

    //check result after a players's choice
    function checkResult() {
        // check result, if a player won or if draw, each time after a player made a choice
        if (chosenCases.length == 9) {
            console.log("game over!");
        }
    }

    function loadCaseEvnt() {
        for(let i=0; i< cases.length; i++) {
            cases[i].addEventListener("click", function(){
                handleChoice(i);
                checkResult();
            });
        }
    }
    
    function startGame(playerNum) {
        popUp.style.display = "none";
        loadCaseEvnt();
    }
    
    onePGameBtn.addEventListener("click", function(){
        startGame(1);
    });
    
    twoPGameBtn.addEventListener("click", function(){
        startGame(2);
    });

}

window.addEventListener("load", mainScript);