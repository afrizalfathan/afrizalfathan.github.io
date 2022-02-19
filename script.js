'use strict';
const curScore0 = document.querySelector(".current-score0");
const curScore1 = document.querySelector(".current-score1");
const score1 = document.querySelector(".score0");
const score2 = document.querySelector(".score1");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const dice = document.querySelector(".dice");
const player1 = document.querySelector('.player0');
const player2 = document.querySelector('.player1');
const container = document.querySelector('.container');
const buttonCenter = document.querySelector(".button-center");
const playerWinner = document.querySelector(".winner");
const newGame = document.querySelector(".newgame");

let scores, activePlayer, currentScore;

const init = (e) => {
    score1.textContent = 0;
    score2.textContent = 0;
    dice.classList.add("hidden")

    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;

    
    curScore0.textContent = 0;
    curScore1.textContent = 0;
    player1.classList.remove('win');
    player2.classList.remove('win');
    player1.classList.add('player-active');
    player2.classList.remove('player-active');
    buttonCenter.classList.remove('hidden');
    playerWinner.classList.add('hidden');

}

init();

// Membuat fungsi untuk ganti pemain
const gantiPemain = (e) => {
    document.querySelector(`.current-score${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player-active');
    player2.classList.toggle('player-active');
};

// Membuat dadu berputar
btnRoll.addEventListener("click", (e) => {
    const random = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${random}.png`;

    // jika dadu dapat nomor 1
    if(random !== 1) {
        currentScore += random;
        document.querySelector(`.current-score${activePlayer}`).textContent = currentScore;
    } else {
        // Ganti Player
        gantiPemain();
    }
});

// membuat tombol hold berfungsi
btnHold.addEventListener("click", () => {
    // 1. Tambahkan score ke activePlayer
    scores[activePlayer] += currentScore
    document.querySelector(`.score${activePlayer}`).textContent = scores[activePlayer];
    // 3. Tentukan jika players dapat score lebih dari 100 
    if(scores[activePlayer] >= 100){
        document.querySelector(`.player${activePlayer}`).classList.add('win');
        document.querySelector(`.player${activePlayer}`).classList.remove('player-active');
        // Jika score lebih dari 100, tombol hold dan roll di hapus
        dice.classList.add("hidden");
        buttonCenter.classList.add('hidden');
        playerWinner.classList.remove('hidden');
        if(activePlayer === 0){
            document.querySelector(".winner").textContent = `Player 1 Win!`;
        } else if (activePlayer === 1){
            document.querySelector(".winner").textContent = `Player 2 Win!`;
        };
        
    } else {
        gantiPemain();
    }
});

// Membuat tombol new game aktif
newGame.addEventListener('click', init);