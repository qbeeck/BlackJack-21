// ***** elements *****
const pScore = document.querySelector(".playerScore");
const dScore = document.querySelector(".dealerScore");
const gStatus = document.querySelector(".gameStatus");
const pHand = document.querySelector(".playerHand");
const dHand = document.querySelector(".dealerHand");
const hitBtn = document.querySelector(".hitButton");
const standBtn = document.querySelector(".standButton");
const nGameBtn = document.querySelector(".newGame");
const wStatus = document.querySelector(".winStat");
const lStatus = document.querySelector(".lossStat");
const dStatus = document.querySelector(".drawStat");
// ***** events *****
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
nGameBtn.addEventListener("click", newGame);
// ***** values *****
let deck = new Array();
let startedGame = false;
let gameStand = false;

let playerCards = new Array();
let playerCardsURL = new Array();
let playerScore = 0;

let dealerCards = new Array();
let dealerCardsURL = new Array();
let dealerScore = 0;

let wins = 0;
let loss = 0;
let draw = 0;
// ***** functions *****
let deckUtilities = {
  createDeck() {
    let suits = ["s", "d", "c", "h"];
    let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
    for (let i = 0; i < suits.length; i++) {
      for (let g = 0; g < values.length;g++) {
        let card = suits[i] + values[g];
        deck.push(card);
      }
    }
  },
  shuffleDeck() {
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor((Math.random() * deck.length));
      let location2 = Math.floor((Math.random() * deck.length));
      let tmp = deck[location1];
      deck[location1] = deck[location2];
      deck[location2] = tmp;
      
    }
  },
};

let cards = {
  cardToPlayer(num) {
    playerCards = deck.splice(0, num);
  },
  pCardsURL() {
    playerCardsURL = playerCards.map(el => {return `${el}.png`});
  },
  cardToDealer(num) {
    dealerCards = deck.splice(0, num);
  },
  dCardsURL() {
    dealerCardsURL = dealerCards.map(el => {return `${el}.png`});
  }
};

let table = {
  pTable() {
    playerCardsURL.map((el, node) => {
      node = document.createElement("div");
      node.classList.add("card","playerCard");
      node.innerHTML = `
                      <img src="./img/${el}">
      `;
      pHand.appendChild(node);
    });
  },
  dTable() {
    dealerCardsURL.map((el, node) => {
      node = document.createElement("div");
      node.classList.add("card","dealerCard");
      node.innerHTML = `
                      <img src="./img/${el}">
      `;
      dHand.appendChild(node);
    });
  },
  dInverted() {
    inverted = document.createElement("div");
    inverted.classList.add("invCard", "card");
    inverted.innerHTML = `
                      <img src="./img/hidden.png">
      `;
      dHand.appendChild(inverted);
  }
};

let scoreStatus = {
  calculatePlayerScore() {
    for (let value of playerCards) {
      playerScore += +value.substr(1);
    }
  pScore.textContent = playerScore;
  },
  calculateDealerScore() {
    for (let value of dealerCards) {
      dealerScore += +value.substr(1);
    }
  dScore.textContent = dealerScore;
  }
};

let deleteItems = {
  deleteCards() {
    let elements = document.getElementsByClassName("card");
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  },
  deletePlayerCards() {
    let elements = document.getElementsByClassName("playerCard");
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  },
  deleteInvertedCard() {
    let elements = document.getElementsByClassName("invCard");
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  },
  deleteDealerCards() {
    let elements = document.getElementsByClassName("dealerCard");
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
}

function newGame() {
  if (!startedGame) {
    deckUtilities.createDeck();
    deckUtilities.shuffleDeck();
    cards.cardToPlayer(2);
    cards.cardToDealer(1);
    cards.pCardsURL();
    cards.dCardsURL();
    table.pTable();
    table.dInverted();
    table.dTable();
    scoreStatus.calculatePlayerScore();
    scoreStatus.calculateDealerScore();
    gStatus.textContent = "Hit or Stand";
    startedGame = true;
    hitBtn.disabled = false;
    standBtn.disabled = false;
    rule.checkScore();
  } else if (startedGame) {
    deleteItems.deleteCards();
    startedGame = false;
    playerScore = 0;
    dealerScore = 0;
    newGame();
  }
}

function hit() {
  playerScore = 0;
  playerCards = playerCards.concat(deck.splice(0, 1));
  cards.pCardsURL();
  deleteItems.deletePlayerCards();
  table.pTable();
  scoreStatus.calculatePlayerScore();
  
}

function stand() {
  dealerScore = 0;
  dealerCards = dealerCards.concat(deck.splice(0, 1));
  cards.dCardsURL();
  deleteItems.deleteInvertedCard();
  deleteItems.deleteDealerCards();
  table.dTable();
  scoreStatus.calculateDealerScore();
  gameStand = true;
}



// Доделать stand, 
//          набор карт пока у дилера не будет больше очков чем игрока
//          правила игры
//          может быть и локальное хранилище для статистики