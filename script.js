const btnStart = document.querySelector('#start');
const btnSurrender = document.querySelector('#surrender');
const announce = document.querySelector('#announce');
const log = document.querySelector('#log');
const btnDiv = document.querySelector('.gamebuttons');
const settingsWindow = document.querySelector('.settings');
const btnsettings = document.querySelector('#opensettings');
const btnSetClose = document.querySelector('#closesettings');
const wrapper = document.querySelector('.wrapper');
const rangeMaxInput = document.querySelector('#inputmax');
const maxInput = document.querySelector('#max');
const progressBar = document.querySelector('#progress');
const min = 1;

let playerName = document.querySelector('#name').value;
let max = +maxInput.value;
let rangeMax = +rangeMaxInput.value;
let sum;
let whosTurn;
let playerNum;
let gameStarted = 0;



generateButtons();

function generateButtons() {
    btnDiv.innerHTML = "";
    for (i = 1; i <= rangeMax; i++) {

        let button = document.createElement("button");
        button.setAttribute("value", i);
        button.classList.add("gamebutton");
        button.innerHTML = i;
        btnDiv.appendChild(button);

        button.addEventListener("click", function () {
            if (gameStarted === 1) {
                playerNum = +this.value;
                playerTurn();
            }

        });

    }
}
btnsettings.addEventListener('click', () => {
    if (gameStarted === 0) {
        settingsWindow.classList.remove("hidden");
        wrapper.classList.add("hidden");
    } else {
        btnsettings.innerText = "can't open settings while the game is active!";
    }
});

btnSetClose.addEventListener('click', () => {
    rangeMax = +rangeMaxInput.value;
    max = +maxInput.value;
    playerName = document.querySelector('#name').value;
    settingsWindow.classList.add("hidden");
    wrapper.classList.remove("hidden");
    generateButtons();
});

function progressUpdate() {
    progressBar.max = max;
    progressBar.value = sum;
}

const start = () => {
    gameStarted = 1;
    sum = 0;
    log.innerText = '';
    playerNum = '';
    const choosePlayer = [`${playerName} is first`, `Computer is first`];
    whosTurn = getRand(0, 1);
    announce.classList.remove("winner");
    announce.innerText = choosePlayer[whosTurn];
    btnStart.removeEventListener('click', start);
    btnStart.classList.replace('btn-enabled', 'btn-disabled');
    btnSurrender.addEventListener('click', surrender);
    btnSurrender.classList.replace('btn-disabled', 'btn-enabled');
    btnStart.innerHTML = `first to ${max} wins!`;

    if (whosTurn === 1) computerTurn();
};

const getRand = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};


const computerTurn = () => {
    progressUpdate();
    btnStart.innerHTML = `first to ${max} wins!`;
    playerNum = '';
    // let compNum = getRand(min,rangeMax);
    let compNum;
    if (sum + rangeMax >= max) {
        compNum = max - sum;
    } else {
        compNum = getRand(min, rangeMax);
    };

    sum += compNum;
    announce.innerText = `Computer's turn`;
    function aiThink() {
        timeout = setTimeout(alertFunc, 800);
    }
    function alertFunc() {
        progressUpdate();
        log.innerHTML += `<span>Computer has chosen ${compNum}, the sum now is ${sum}</span> <br>`;
        log.scrollTop = log.scrollHeight;
        // if ((sum + rangeMax) < max) {
            announce.innerText = `${playerName}'s turn`;
        // }
    }
    aiThink();
    ifWin();
    whosTurn = 0;
};

const playerTurn = () => {
    btnStart.innerHTML = `First to ${max} wins!`;
    sum += playerNum;
    progressUpdate();
    log.innerHTML += `<span>${playerName} has chosen ${playerNum}, the sum now is ${sum}</span><br>`;
    log.scrollTop = log.scrollHeight;
    if (!ifWin()) {
        whosTurn = 1;
        computerTurn();
    }
};

const ifWin = () => {
    const whoWon = ['computer won', playerName + ' won'];
    if (sum >= max) {
        function announceWinner() {
            if (whosTurn = 1) {
                timeout = setTimeout(printWinner, 1200);
            } else if (whosTurn = 0){
                timeout = setTimeout(printWinner, 2000);
            } else {
                alert("whosturn???");
            }
        }
        function printWinner() {
            announce.innerHTML = whoWon[whosTurn];
            btnStart.innerHTML = `play again`;
            announce.classList.add("winner");
        }
        announceWinner();
        btnStart.addEventListener('click', start);
        btnStart.classList.replace('btn-disabled', 'btn-enabled');
        gameStarted = 0;
        return true;
    }
    return false;
};
const surrender = () => {
    log.innerHTML += `<span class="red">${playerName} surrendered</span>`;
    announce.innerHTML = `Game stopped, adjust settings or start again with the same settings`
    btnStart.addEventListener('click', start);
    btnStart.classList.replace('btn-disabled', 'btn-enabled');
    btnSurrender.removeEventListener('click', surrender);
    btnSurrender.classList.replace('btn-enabled', 'btn-disabled');
    btnStart.innerHTML = `play again`;
    sum = 0;
    gameStarted = 0;
    progressUpdate();
    btnsettings.innerHTML = "settings";
};

btnStart.addEventListener('click', start);

maxInput.addEventListener('change', () => {

    if (+maxInput.value >= +maxInput.max) {
        maxInput.value = +maxInput.max;
    } else if (+maxInput.value <= +maxInput.min) {
        maxInput.value = +maxInput.min;
    } else {
    }
});

rangeMaxInput.addEventListener('change', () => {
    if (+rangeMaxInput.value >= +rangeMaxInput.max) {
        rangeMaxInput.value = +rangeMaxInput.max;
    } else if (+rangeMaxInput.value <= +rangeMaxInput.min) {
        rangeMaxInput.value = +rangeMaxInput.min;
    } else {
    }
});
