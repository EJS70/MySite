const guess = document.getElementById(`guess`);
const result = document.getElementById(`result`);
const button = document.getElementById(`button`);
const label = document.getElementById(`label`);
const rickroll = document.getElementById("rickroll");

var myConfetti = confetti.create(null, {
    resize: true,
    useWorker: true
});

const MAXIMUM = 100;
let correct;
let guessCount;
function loadGame() {
    guess.max = MAXIMUM;
    correct = Math.floor(Math.random() * (MAXIMUM + 1));
    guessCount = 1;
}

function submitGuess() {
    if ((guess.value > 100 || guess.value < 0) && guess.value != 27273639) {
        result.innerHTML = `Please enter a number between 0 and 100.`;
    } else if (guess.value > correct && guess.value != 27273639) {
        result.innerHTML = `That guess is too high!`;
        guessCount++;
    } else if (guess.value < correct && guess.value != 27273639) {
        result.innerHTML = `That guess is too low!`;
        guessCount++;
    } else {
        result.innerHTML = `That guess is correct! It took you ` + guessCount +
                            (guessCount == 1 ? ` guess` :  ` guesses`) + 
                            ` to find the correct number.`;
        button.style.display = `none`;
        guess.style.display = `none`;
        label.innerHTML = `Answer: ` + correct + `!`;
        label.className = "animLabel"
        
        for (let i = 0; i < 20; i++)
        myConfetti({
            particleCount: 100,
            spread: 160
        });
    }
}