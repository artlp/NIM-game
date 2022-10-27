//let max = 100;
// 20 is for now - just to make faster trials

const btnStart = document.querySelector('#start');
const btnSurrender = document.querySelector('#surrender');
const announce = document.querySelector('#announce');
const numInp = document.querySelector('#num');
const log = document.querySelector('#log');
const btnDiv = document.querySelector('.gamebuttons');
const numberButtons = document.querySelector(".number-buttons");
const settingsWindow = document.querySelector('.settings');
const btnsettings = document.querySelector('#opensettings');
const btnSetClose = document.querySelector('#closesettings');
const wrapper = document.querySelector('.wrapper');
const rangeMaxInput = document.querySelector('#inputmax');
const maxInput = document.querySelector('#max');

let max = +maxInput.value;
let rangeMax = +rangeMaxInput.value; // The player may input numbers from 1 to 9
let sum;
let whosTurn;
let playerNum;
let gameStarted = 0;



generateButtons();
// rangeMaxInput.addEventListener("input", generateButtons);

function generateButtons() {
    btnDiv.innerHTML = "";
    // rangeMax = +document.querySelector("#rangemax").value; 
    for (i = 1; i <= rangeMax; i++) {

        let button = document.createElement("button");
        button.setAttribute("value", i);
        button.classList.add("gamebutton");
        button.innerHTML = i;
        btnDiv.appendChild(button);

        button.addEventListener("click", function () {
            if (gameStarted === 1){ 
            playerNum = +this.value;
            playerTurn();}

        });

    }
}
btnsettings.addEventListener('click', ()=> {
    if (gameStarted === 0){
    settingsWindow.classList.remove("hidden");
    wrapper.classList.add("hidden");} else {
        btnsettings.innerText = "Can't open settings while the game is active!"
    }
});

btnSetClose.addEventListener('click', ()=> {
    rangeMax = +rangeMaxInput.value; 
    max = +maxInput.value;
    settingsWindow.classList.add("hidden");
    wrapper.classList.remove("hidden");

    generateButtons();
})
// MISSION: when button "Start" is clicked, there should be 
// an annoucement "You're first" or "I'm first"

const start = () => {
    gameStarted = 1;
    sum = 0;
    log.innerText = '';
    playerNum = '';
    const choosePlayer = ["Player is first", "Computer is first"];
    //let turn = Math.round(Math.random());
    whosTurn = getRand(0, 1);
    announce.innerText = choosePlayer[whosTurn];
    btnStart.removeEventListener('click', start);
    btnStart.classList.replace('btn-enabled', 'btn-disabled');
    btnSurrender.addEventListener('click', surrender);
    btnSurrender.classList.replace('btn-disabled', 'btn-enabled');
    btnStart.innerHTML = `First to ${max} wins!`;

    if (whosTurn === 1) computerTurn();
};

const getRand = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};


const computerTurn = () => {
    // MISSION:
    // 1. randomly choose number from 1 to 9
    // 2. add it to the sum, for example, the sum now is 14
    // 3. show in the log smth like:
    //    machine: has chosen 9, the sum now is 14
    // 4. Call this function from the function "start"
    //    when the 1st turn is computer's
    btnStart.innerHTML = `First to ${max} wins!`;

    playerNum = '';
    let compNum = getRand(1, 9);
    if (sum + compNum > max) compNum = max - sum;
    // if the sum will be greater than max,
    // fix compNum to make the sum be max exactly
    sum += compNum;
    announce.innerText = `Computer's turn`;
    function aiThink() {
        timeout = setTimeout(alertFunc, 1000);
    }
    function alertFunc() {
        log.innerHTML += `<span>Computer has chosen ${compNum}, the sum now is ${sum}</span> <br>`;
        announce.innerText = `Player's turn`;
    }
    aiThink();
    // check if computer has WON 
    ifWin();
    whosTurn = 0;
};

const playerTurn = () => {
    // let num = +numInp.value;
    btnStart.innerHTML = `First to ${max} wins!`;

    // if (num < 1 || num > rangeMax || num % 1 !== 0)
    if (playerNum < 1 || playerNum > rangeMax || !Number.isInteger(playerNum)) {
        return;
    }

    sum += playerNum;
    log.innerHTML += `<span>Player has chosen ${playerNum}, the sum now is ${sum}</span><br>`;

    if (!ifWin()) {

        whosTurn = 1;
        computerTurn();

    }
};

const ifWin = () => {
    console.log(playerNum, sum);

    if (sum >= max) {

        const whoWon = ['Player won', 'Computer won'];
        announce.innerText = whoWon[whosTurn];
        btnStart.innerHTML = `Play again`;

        btnStart.addEventListener('click', start);
        btnStart.classList.replace('btn-disabled', 'btn-enabled');
        gameStarted = 0;
        return true;
    }

    return false;

};

// const preventTooBig = () => {
//     let num = +numInp.value;

//     if (num < 1 || num > rangeMax || !Number.isInteger(num)) {
//         return;
//     }

//     if (sum + num > max)
//         numInp.value = '';

// };

const surrender = () => {

    announce.innerText = 'You looooose, na-na-na ☠️';
    btnStart.addEventListener('click', start);
    btnStart.classList.replace('btn-disabled', 'btn-enabled');
    btnSurrender.removeEventListener('click', surrender);
    btnSurrender.classList.replace('btn-enabled', 'btn-disabled');
    btnStart.innerHTML = `Play again`;
    gameStarted = 0;
    btnsettings.innerHTML = "Settings";

};
// let inputblock1 = 0;
// let inputblock2 = 0;
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
    // console.log(+rangeMaxInput.value, rangeMaxInput.min, rangeMaxInput.max);
    // inputblock2 = +rangeMaxInput.max;
    if (+rangeMaxInput.value >= +rangeMaxInput.max) {
        rangeMaxInput.value = +rangeMaxInput.max; 
    } else if (+rangeMaxInput.value <= +rangeMaxInput.min) {
        rangeMaxInput.value = +rangeMaxInput.min;
    } else {
    }
});
// MISSION: 1. when clicking on "Surrender" - remove listener from "Surrender"
// and stop the game
// 2. When starting the game, add listener to "Surrender"