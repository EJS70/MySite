const guess = document.getElementById(`guess`);
const result = document.getElementById(`result`);

const MAXIMUM = 100;
let correct;
function loadGame() {
    guess.max = MAXIMUM;
    correct = Math.random() * (MAXIMUM + 1);
    correct = Math.floor(correct);
}

function submitGuess() {

}