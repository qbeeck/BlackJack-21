const pScore = document.querySelector(".playerScore");
const dScore = document.querySelector(".dealerScore");
const gStatus = document.querySelector(".gameStatus");
const pHand = document.querySelector(".playerHand");
const hitBtn = document.querySelector(".hitButton");
const standBtn = document.querySelector(".standButton");
const nGameBtn = document.querySelector(".newGame");
const wStat = document.querySelector(".winStat");
const lStat = document.querySelector(".lossStat");
const dStat = document.querySelector(".drawStat");
// ***** events *****
// hitBtn.addEventListener("click", hit);
// standBtn.addEventListener("click", stand);
// nGameBtn.addEventListener("click", newGame);
// ***** values *****
let deck = new Array();
let pCards;
let dCards;
let pPoints = 0;
let dPoints = 0;
// ***** functions *****
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
function pTable() {
  let q = document.createElement("div");
  q.classList.add("card");
  q.innerHTML = `
                <img src="./img/${value}.png"></img>
                `;
  for (i=0;i<2;i++) {
    pHand.appendChild(q);
  }
}

createDeck();
shuffleDeck();
playersCard();
checkPoints();
console.log(dPoints);
console.log(pPoints);