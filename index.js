/* PIG DICE Game */

var scores, current, activePlayer, winner;
init();

//implementing the roll dice button click function
document.getElementById('roll-dice').addEventListener('click', function () {

    //dice should be shown when roll dice button is clicked
    document.getElementById('dice-block').style.display = 'block';

    //generate a random number between one and six
    var dice = Math.floor(Math.random() * 6) + 1;

    //if dice throws one the current score becomes zero and turn goes to the next player
    if (dice !== 1) {
        //update the dice number in UI
        document.getElementById('dice-block').src = 'assets/dice-' + dice + '.png'
        //add the dice value to the current score
        current += dice;

        //update the current score value in the UI
        document.getElementById('current-' + activePlayer).textContent = current;
    }
    else {
        nextPlayer();
    }
})


//implementing the hold function
document.getElementById('hold').addEventListener('click', function () {

    //adding the current score to the global score of the active player
    scores[activePlayer] += current;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //checking if the active player has won the game 
    if (scores[activePlayer] >= 20) {
        winner = activePlayer
        document.getElementById('board-' + activePlayer).classList.remove('active');
        document.getElementById('board-' + activePlayer).classList.add('winner');
        document.getElementById('player-' + activePlayer).textContent = "WINNER";
        document.getElementById('dice-block').style.display = 'none';
        document.getElementById('roll-dice').disabled = true;
        document.getElementById('hold').disabled = true;
    }
    //else next turn goes to next player
    else {
        nextPlayer();
    }
})


//DRY Dont Repeat Yourself principle
function nextPlayer() {
    //hide the dice
    document.getElementById('dice-block').style.display = 'none';

    //change the activePlayer to next player
    document.getElementById('board-0').classList.toggle('active');
    document.getElementById('board-1').classList.toggle('active');
    activePlayer = activePlayer === 0 ? 1 : 0;

    //change the current score value to 0
    current = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    if (activePlayer == 0) {
        document.querySelector('.dot-active-0').style.display = 'inline-block';
        document.querySelector('.dot-active-1').style.display = 'none';
    }
    else {
        document.querySelector('.dot-active-1').style.display = 'inline-block';
        document.querySelector('.dot-active-0').style.display = 'none';
    }
}


//New Game Button
document.getElementById('new-game').addEventListener('click', init);


//game initialization button
function init() {
    if (activePlayer === 1 && winner !== 1) {
        document.getElementById('board-1').classList.remove('active');
        document.querySelector('.dot-active-1').style.display = 'none';
    }
    if (winner === 1) {
        document.getElementById('board-1').classList.remove('winner');
    }
    else {
        document.getElementById('board-0').classList.remove('winner');
    }
    scores = [0, 0];
    current = 0;
    activePlayer = 0;

    //dice should be hidden until roll dice button is clicked
    document.getElementById('dice-block').style.display = 'none';
    document.getElementById('board-0').classList.add('active');
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('player-0').textContent = 'PLAYER 1';
    document.getElementById('player-1').textContent = 'PLAYER 2';
    document.querySelector('.dot-active-0').style.display = 'inline-block';
    document.getElementById('roll-dice').disabled = false;
    document.getElementById('hold').disabled = false;
}