const pScore = document.querySelector(".playerScore");
const dScore = document.querySelector(".dealerScore");
const gStatus = document.querySelector(".gameStatus");
const pHand = document.querySelector(".playerHand");
const dHand = document.querySelector(".dealerHand");
const hitBtn = document.querySelector(".hitButton");
const standBtn = document.querySelector(".standButton");
const wStat = document.querySelector(".winStat");
const lStat = document.querySelector(".lossStat");
const dStat = document.querySelector(".dealStat");
// ***** events *****
// hitBtn.addEventListener("click", hit);
// standBtn.addEventListener("click", stand);
// ***** values *****
let deck = new Array; 
// ***** functions *****
// function hit(e) {
//   e.preventDefault();
// }
function createDeck() {
  let suits = ["s", "d", "c", "h"];
  let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  for (let i = 0; i < suits.length; i++) {
    for (let g = 0; g < values.length;g++) {
      let card = [suits[i] + values[g]];
      deck.push(card);
    }
  }
  return deck;
}
function shuffle() {
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor((Math.random() * deck.length));
    let location2 = Math.floor((Math.random() * deck.length));
    let tmp = deck[location1];

    deck[location1] = deck[location2];
		deck[location2] = tmp;
  }
}

