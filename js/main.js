console.log("hello world");

function mainScript() {

    let popUp = document.querySelector("#pop-up");
    let onePGameBtn = document.querySelector("#play-1p");
    let twoPGameBtn = document.getElementById("play-2p");
    let cases = Array.from(document.querySelectorAll("[id^=case]"));

    //console.log(cases);

    //constructor for the players
    function Player(number, turn, symbol) {
        this.number = number;
        this.turn = turn;
        this.symbol = symbol;
        this.choices = [];
        this.addSymbol = function(caseId) {

            // make sure a player doesn't make a choice only once
            if (!this.choices.includes(caseId)) {
                this.choices.push(caseId);
            }

            console.log("player " + this.number + " choices:");
            console.log(this.choices);
        }
        this.updateTurn = function() {
            this.turn = !this.turn;
        }
    }

    // create the players
    let playerOne = new Player(1, true, "circle");
    let playerTwo = new Player(2, false, "cross");

    // handle a game
    function handleChoice(index) {
        // handle player's choice & turns

        if (playerOne.turn && !playerTwo.choices.includes(index)) {
            playerOne.addSymbol(index);
        } else if (!playerOne.choices.includes(index)) {
            playerTwo.addSymbol(index);
        }

        playerOne.updateTurn();
        playerTwo.updateTurn();
    }

    //check result after a players's choice
    function checkResult() {
        // check result, if a player won or if draw, each time after a player made a choice
        console.log("todo");
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

        // console.log("click" + playerNum);

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