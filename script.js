'use strict';

//  SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// '#' IS USED BECAUSE 'score--0' IS AN 'ID'
const score0El = document.querySelector('#score--0');

// ANOTHER WAY OF SELECTING AN ELEMENT USING ID AS IT'S SELECTOR
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; // DEFINED AS UNDEFINED OUTSIDE THE FUNCTION SO THAT THEY WILL BE ACCESSABLE ROUND THE CODE

const init = function () {
  // STARTING CONDITIONS
  score0El.textContent = 0;
  score1El.textContent = 0;

  // CANNOT BE DECLARED IN THE 'HANDLER FUNCTION' BECAUSE WE DO'NT WANT THE SCORE TO RESET TO '0' EACH TIME THE BUTTON IS CLICKED
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // DETERMINES WHO IS PLAYING ACCORDING TO THEIR CLASS I.E AT FIRST THE SECTION THAT GETS THE GAME FUNCTIONALITY IS THE ONE WITH THE CLASS OF "player--0"(FIRST PLAYER) AND THE SECOND PLAYER HAS A CLASS OF "player--1"
  playing = true; // KEEPS GAME FUNCTIONALITY TRUE UNTIL A CERTAIN PLAYER REACHES 100 >=

  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  diceEl.classList.add('hidden');
};

// NEEDS NO PARAMETER BECAUSE NOTHING CHANGES, JUST A REUSABLE PIECE OF CODE
const switchPlayer = function () {
  //SWITCH TO NEXT PLAYER
  document.getElementById(`current--${activePlayer}`).textContent = 0; // WHEN SECTION IS SWITCHED, CURRENTSCORE SHOULD BE "0". ALSO AT FIRST EXECUTION OF SCRIPT, THE ID IS "current--0" BECAUSE THE "activePlayer" VARAIBLE IS INITIALY SET TO "0"
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // IF "activePlayer" VALUE = 0, NEW "activePlayer" SHOULD BE "1" ELSE, VICEVERSA. AT THE FIRST EXECUTION OF SCRIPT, THE "activePlayer" VARIABLE IS "0" BUT DUE TO THIS TERNARY OPERATOR, IT WILL BE CHANGED TO "1"

  // THE "toggle()"" METHOD ADDS A CERTAIN CLASS IF IT'S NOT IN AN ELEMENT  AND REMOVES IT IF IT IS IN THE ELEMENT
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // THIS CONDITION WILL HELP TO TERMINATE THE ROLLING DICE FUNCTIONALITY ONCE WE HAVE A WINNER
    // 1. GENERATING A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1; // WHATEVER NUMBER GENERATED WILL BE USED TO LOAD THE IMAGE

    // 2. DISPLAY DICE
    diceEl.classList.remove('hidden');

    //   LOADING THE IMAGE USING THE "src" PROPERTY
    diceEl.src = `dice-${dice}.png`;

    // 3. CHECK FOR ROLLED 1: IF TRUE
    if (dice !== 1) {
      // ADD DICE TO CURRENT SCORE
      currentScore += dice; // currentScore(new) = currentScore(0) + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // THIS CONDITION WILL HELP TO TERMINATE THE HOLD DICE FUNCTIONALITY ONCE WE HAVE A WINNER
    // 1. ADD CURRENT SCORE TO ACTIVE PLAYER SCORE
    scores[activePlayer] += currentScore; // "score[0]"(0) + currentScore(generated in the btnRoll handler) = score[according to activePlayer]
    // scores[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. CHECK IF PLAYER'S SCORE IS >=100
    if (scores[activePlayer] >= 100) {
      // FINISH THE GAME
      playing = false; // TERMINATE GAME LOGIC
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      // DONE😎 BY ME
      document.querySelector(`#name--${activePlayer}`).textContent = `WINNER`;
    } else {
      // SWITCH TO THE NEXT PLAYER
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
  diceEl.classList.add('.hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.querySelector(`#name--${activePlayer}`).textContent =
    `Player ${activePlayer + 1}`;
});

// ALWAYS ACCESS A DOM IN A VARIABLE
