const pScore = document.querySelector(".playerScore");
const dScore = document.querySelector(".dealerScore");
const gStatus = document.querySelector(".gameStatus");
const pHand = document.querySelector(".playerHand");
const dHand = document.querySelector(".dealerHand");
const hitBtn = document.querySelector(".hitButton");
const standBtn = document.querySelector(".standButton");
const nGameBtn = document.querySelector(".newGame");
const wStat = document.querySelector(".winStat");
const lStat = document.querySelector(".lossStat");
const dStat = document.querySelector(".drawStat");
// ***** events *****
// hitBtn.addEventListener("click", hit);
// standBtn.addEventListener("click", stand);
nGameBtn.addEventListener("click", newGame);
// ***** values *****
let deck = new Array();
let pCards;
let dCards;
let pPoints = 0;
let dPoints = 0;
let pECards;
let dECards;
let startedGame = false;
// ***** functions *****
function newGame() {
  if (!startedGame) {
    gStatus.textContent = "choose an option";
    createDeck();
    shuffleDeck();
    playersCard();
    checkPoints();
    editArrCards();
    pTable(pECards);
    dTable(dECards);
    startedGame = true;
  } else if (startedGame) {
    setBackToDefault();
    startedGame = false;
    newGame();
  }
}
function createDeck() {
  let suits = ["s", "d", "c", "h"];
  let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  for (let i = 0; i < suits.length; i++) {
    for (let g = 0; g < values.length;g++) {
      let card = suits[i] + values[g];
      deck.push(card);
    }
  }
}
function shuffleDeck() {
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor((Math.random() * deck.length));
    let location2 = Math.floor((Math.random() * deck.length));
    let tmp = deck[location1];
    deck[location1] = deck[location2];
		deck[location2] = tmp;
  }
}
function playersCard() {
  pCards = deck.splice(0, 2);
  dCards = deck.splice(0, 1);
}
function checkPoints() {
  let lpPoints = new Array();
  let ldPoints = new Array();
  pCards.forEach(el => lpPoints.push(+el.substr(1)));
  dCards.forEach(el => ldPoints.push(+el.substr(1)));
  lpPoints.forEach(element => pPoints += element);
  ldPoints.forEach(element => dPoints += element);
}
function editArrCards() {
pECards = pCards.map(el => { return `${el}.png`});
dECards = dCards.map(el => { return `${el}.png`});
}
function pTable(arr) {
  arr.map((el, node) => {
    node = document.createElement("div");
    node.classList.add("card");
    node.innerHTML = `
                    <img src="./img/${el}">
    `;
    pHand.appendChild(node);
  });
}
function dTable(arr) {
  arr.map((el, node) => {
    node = document.createElement("div");
    node.classList.add("card");
    node.innerHTML = `
                    <img src="./img/${el}">
    `;
    dHand.appendChild(node);
  });
}
function setBackToDefault() {
  let elements = document.getElementsByClassName("card");
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}