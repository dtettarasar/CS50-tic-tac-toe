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
            console.log("selected case" + caseId);
        }
        this.updateTurn = function() {
            this.turn = !this.turn;
        }
    }

    //create the players
    let playerOne = new Player(1, true, "circle");
    let playerTwo = new Player(2, false, "cross");

    function loadCaseEvnt() {
        for(let i=0; i< cases.length; i++) {
            cases[i].addEventListener("click", function(){
                console.log("click on case" + i);
                playerOne.updateTurn();
                playerTwo.updateTurn();
                console.log(playerOne, playerTwo);
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