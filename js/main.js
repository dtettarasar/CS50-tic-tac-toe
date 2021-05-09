console.log("hello world");

function mainScript() {

    let popUp = document.querySelector("#pop-up");
    let onePGameBtn = document.querySelector("#play-1p");
    let twoPGameBtn = document.getElementById("play-2p");
    
    function startGame(playerNum) {
        popUp.style.display = "none";
        console.log("click" + playerNum);
    }
    
    onePGameBtn.addEventListener("click", function(){
        startGame(1);
    });
    
    twoPGameBtn.addEventListener("click", function(){
        startGame(2);
    });

}

window.addEventListener("load", mainScript);