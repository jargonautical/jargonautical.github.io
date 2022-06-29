const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

const showCard1 = document.createElement('div');
showCard1.setAttribute('class', 'card');
container.appendChild(showCard1);

const showCard2 = document.createElement('div');
showCard2.setAttribute('class', 'card');
container.appendChild(showCard2);

const showCard3 = document.createElement('div');
showCard3.setAttribute('class', 'card');
container.appendChild(showCard3);

const showCard4 = document.createElement('div');
showCard4.setAttribute('class', 'card');
container.appendChild(showCard4);

// program to shuffle the deck of cards

function shuffle(thisDeck) {
  // shuffle the cards
  for (let i = thisDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = thisDeck[i];
      thisDeck[i] = thisDeck[j];
      thisDeck[j] = temp;
      //console.log('your card is: ', temp);
      return temp;
  }
}

let arcCards = [];
function getArcCards() {
  // declare card elements
  const suits = ["collapse", "discipline", "grow", "transform"];
  const values = ["aCentury","aDecade","aFewYears","aGeneration","aMillenium","twoGenerations",];
  // create arc cards
  for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
          let card = { Value: values[x], Suit: suits[i] };
          arcCards.push(card);
      }
  }
  console.log('arcCards deck: ', arcCards);
}

let moodCards = [];
function getMoodCards() {
  // declare card elements
  const suits = ["mood"];
  const values = ["admiration","alienation","amusement","anger","anxiety","awkwardness",];
  // create mood cards
  for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
          let card = { Value: values[x], Suit: suits[i] };
          moodCards.push(card);
      }
  }
  console.log('moodCards deck: ', moodCards);
}

getArcCards();
getMoodCards();

var arcCard = shuffle(arcCards);
var moodCard = shuffle(moodCards);
console.log(arcCard, moodCard);

// build arc card container
const placeArcCard = document.createElement('p');
placeArcCard.textContent = `arc_${arcCard.Suit}_${arcCard.Value}.png`;
//console.log('function working? ', thisCard);
showCard1.appendChild(placeArcCard);

// build arc card container
const placeMoodCard = document.createElement('p');
placeMoodCard.textContent = `${moodCard.Suit}_${moodCard.Value}.png`;
showCard2.appendChild(placeMoodCard);
