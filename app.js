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
hitBtn.disabled = true;
standBtn.disabled = true;


let playerCards = new Array();
let playerCardsUrl = new Array();
let playerScore = 0;

let dealerCards = new Array();
let dealerCardsUrl = new Array();
let dealerScore = 0;

let wins = 0;
let losses = 0;
let draws = 0;
// ***** functions *****
function newGame() {
  if (!startedGame) {
    deckFunctions.createDeck();
    deckFunctions.shuffleDeck();
    cardsFunctions.cardToPlayer(2);
    cardsFunctions.cardToDealer(1);
    cardsFunctions.pCardsUrl();
    cardsFunctions.dCardsUrl();
    tableFunctions.pTable();
    tableFunctions.dInverted();
    tableFunctions.dTable();
    scoreFunctions.calcPlayerScore();
    scoreFunctions.calcDealerScore();
    startedGame = true;
    buttonsRefresh()
  } else if (startedGame) {
    deleteFunctions.deleteCards();
    startedGame = false;
    playerScore = 0;
    dealerScore = 0;
    newGame();
  }
}

function hit() {
  playerScore = 0;
  playerCards = playerCards.concat(deck.splice(0, 1));
  cardsFunctions.pCardsUrl();
  deleteFunctions.deletePlayerCards();
  tableFunctions.pTable();
  scoreFunctions.calcPlayerScore();
  playerFunctions.playerRule();
}

function stand() {
  deleteFunctions.deleteInvertedCard();
  dealerFunctions.dealerRule();
}

let deckFunctions = {
  createDeck() {
    let suits = ["s", "d", "c", "h"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
  }
};

let cardsFunctions = {
  cardToPlayer(num) {
    playerCards = deck.splice(0, num);
  },
  pCardsUrl() {
    playerCardsUrl = playerCards.map(el => {return `${el}.png`});
  },
  cardToDealer(num) {
    dealerCards = deck.splice(0, num);
  },
  dCardsUrl() {
    dealerCardsUrl = dealerCards.map(el => {return `${el}.png`});
  }
}

let tableFunctions = {
  pTable() {
    playerCardsUrl.map((el, node) => {
      node = document.createElement("div");
      node.classList.add("card","playerCard");
      node.innerHTML = `
                      <img src="./img/${el}">
      `;
      pHand.appendChild(node);
    });
  },
  dTable() {
    dealerCardsUrl.map((el, node) => {
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
    inverted.classList.add("card", "invCard");
    inverted.innerHTML = `
                      <img src="./img/hidden.png">
      `;
      dHand.appendChild(inverted);
  }
}

let scoreFunctions = {
  calcPlayerScore() {
    for (let value of playerCards) {
      if (value.substr(1) == "A") {
        playerScore += 11;
      } else if (value.substr(1) == "J" || value.substr(1) == "Q" || value.substr(1) == "K") {
        playerScore += 10;
      } else {
        playerScore += +value.substr(1);
      } 
      pScore.textContent = playerScore;
    }
  },
  calcDealerScore() {
    for (let value of dealerCards) {
      if (value.substr(1) == "A") {
        dealerScore += 11;
      } else if (value.substr(1) == "J" || value.substr(1) == "Q" || value.substr(1) == "K") {
        dealerScore += 10;
      } else {
        dealerScore += +value.substr(1);
      } 
      dScore.textContent = dealerScore;
    }
  },
  calcStatistics() {
    wStatus.textContent = wins;
    lStatus.textContent = losses;
    dStatus.textContent = draws;
  }
}

let deleteFunctions = {
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

let playerFunctions = {
  playerRule() {
    if (playerScore > 21) {
      hitBtn.disabled = true;
      standBtn.disabled = true;
      gStatus.textContent = "You lose... New game???"
      losses += 1;
      scoreFunctions.calcStatistics();
    }
  }
}

let dealerFunctions = {
  dealerHit() {
    dealerScore = 0;
    dealerCards = dealerCards.concat(deck.splice(0, 1));
    cardsFunctions.dCardsUrl();
    deleteFunctions.deleteDealerCards();
    tableFunctions.dTable();
    scoreFunctions.calcDealerScore();
  },
  dealerRule() {
    while (true) {
      if (playerScore > dealerScore) {
        dealerFunctions.dealerHit();
      } else {
        break;
      }
    }
    if (dealerScore > playerScore && dealerScore <= 21) {
      gStatus.textContent = "Dealer Won... New game???"
      hitBtn.disabled = true;
      standBtn.disabled = true;
      losses += 1;
      scoreFunctions.calcStatistics();
    } else if (dealerScore > 21) {
      gStatus.textContent = "You won... New game???"
      hitBtn.disabled = true;
      standBtn.disabled = true;
      wins += 1;
      scoreFunctions.calcStatistics();
    } else if (dealerScore == playerScore) {
      gStatus.textContent = "It's draw... New game???"
      hitBtn.disabled = true;
      standBtn.disabled = true;
      draws += 1;
      scoreFunctions.calcStatistics();
    }
  }
}

function buttonsRefresh() {
  hitBtn.disabled = false;
  standBtn.disabled = false;
  gStatus.textContent = "Hit or Stand"
}