'use strict';

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const btnCloseModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnInstructions = document.querySelector(".btn--instructions");

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
// This works too
// document.querySelector(".dice").style.display = "none";
let scores = [0 , 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// End of starting condition

// Functions
const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent
    = currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

btnRoll.addEventListener(
    "click",
    function(){
        if(playing){
            // 1. Generate a random number(1-6)
            const dice = Math.trunc(Math.random() * 6) + 1;

            // 2. Display the dice
            diceEl.classList.remove("hidden");
            diceEl.src = `dice-${dice}.png`;

            if(dice !== 1){
                currentScore += dice;
                document.getElementById(`current--${activePlayer}`).textContent
                = currentScore;
            }
            else {
                // Switch player
                switchPlayer();
            }
        }
    }
);


btnHold.addEventListener(
    "click",
    function() {
        if(playing) {
            // 1. Add current score to active player's score
            scores[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent
            = scores[activePlayer];
    
            // 2. Check if score is >= 100
            if(scores[activePlayer] >= 100) {
                // Finish the game
                playing = false;
                diceEl.classList.add("hidden");
    
                document.querySelector(
                    `.player--${activePlayer}`
                ).classList.add("player--winner");
                document.querySelector(
                    `.player--${activePlayer}`
                ).classList.remove("player--active");
            }
            else {
                // Switch Player
                switchPlayer();
            }
        }
    }
);

btnNew.addEventListener(
    "click",
    function() {
        document.querySelector(
            `.player--${activePlayer}`
        ).classList.remove("player--winner");
        score0El.textContent = 0;
        score1El.textContent = 0;
        scores = [0 , 0];
        currentScore = 0;
        activePlayer = 0;
        playing = true;

        player0El.classList.add("player--active");
        player1El.classList.remove("player--active");
        current0El.textContent = 0;
        current1El.textContent = 0;
    }
)



// Extra
btnCloseModal.addEventListener(
    "click",
    function() {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }
)

btnInstructions.addEventListener(
    "click",
    function() {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }
)

