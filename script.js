//let max = 100;
// 20 is for now - just to make faster trials
let max = 20;
let rangeMax = 9; // The player may input numbers from 1 to 9
let sum;
let whosTurn;

const btnStart = document.querySelector('#start');
const btnSurrender = document.querySelector('#surrender');
const announce = document.querySelector('#announce');
const numInp = document.querySelector('#num');
const log = document.querySelector('#log');

// MISSION: when button "Start" is clicked, there should be 
// an annoucement "You're first" or "I'm first"

const start = () => {
    
    sum = 0;
    log.innerText = '';
    numInp.value = '';
    const choosePlayer = ["🧜You're first", "🖥I'm first"];
    //let turn = Math.round(Math.random());
    whosTurn = getRand(0,1);
    announce.innerText = choosePlayer[whosTurn] ;
    btnStart.removeEventListener('click',start);
    btnStart.classList.replace('btn-enabled', 'btn-disabled');
    btnSurrender.addEventListener('click',surrender);
    btnSurrender.classList.replace('btn-disabled', 'btn-enabled');

    if ( whosTurn === 1 ) computerTurn();
}

const getRand = (min,max) => {
    return Math.floor(Math.random() * (max+1-min)) + min;
}


const computerTurn = () => {
    // MISSION:
    // 1. randomly choose number from 1 to 9
    // 2. add it to the sum, for example, the sum now is 14
    // 3. show in the log smth like:
    //    machine: has chosen 9, the sum now is 14
    // 4. Call this function from the function "start"
    //    when the 1st turn is computer's

    numInp.value = '';
    let compNum = getRand(1,9);
    if (sum + compNum > max) compNum = max - sum;
    // if the sum will be greater than max,
    // fix compNum to make the sum be max exactly
    sum += compNum;
    log.innerText += `🖥 has chosen ${compNum}, the sum now is ${sum}\n`;
    // check if computer has WON 
    ifWin();
    whosTurn = 0;
}

const playerTurn = () => {

    let num = +numInp.value;
    // if (num < 1 || num > rangeMax || num % 1 !== 0)
    if (num < 1 || num > rangeMax || !Number.isInteger(num)) {
        return;
    }

    sum += num;
    log.innerText += `🙆 has chosen ${num}, the sum now is ${sum}\n`;
 
    if (!ifWin()) {

        whosTurn = 1;
        computerTurn();

    }
}

const ifWin = () => {

    if ( sum >= max ) {

        const whoWon = ['You 🤹 won. :(','I won!!!!! 🖥'];
        
        announce.innerText = whoWon[whosTurn];

        btnStart.addEventListener('click',start);
        btnStart.classList.replace('btn-disabled','btn-enabled');
        
        return true;
    }
    
    return false;
    
}

const preventTooBig = () => {
    let num = +numInp.value;
    
    if (num < 1 || num > rangeMax || !Number.isInteger(num)) {
        return;
    }
    
    if (sum + num > max) 
    numInp.value = '';
    
}

const surrender = () => {
    
    announce.innerText = 'You looooose, na-na-na ☠️';
    btnStart.addEventListener('click',start);
    btnStart.classList.replace('btn-disabled','btn-enabled');
    btnSurrender.removeEventListener('click',surrender);
    btnSurrender.classList.replace('btn-enabled','btn-disabled');
}

btnStart.addEventListener('click',start);
numInp.addEventListener('change',playerTurn);
numInp.addEventListener('input',preventTooBig);

// MISSION: 1. when clicking on "Surrender" - remove listener from "Surrender"
// and stop the game
// 2. When starting the game, add listener to "Surrender"