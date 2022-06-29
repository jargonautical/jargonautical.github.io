const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
const showCard = document.createElement('div');
showCard.setAttribute('class', 'card');
container.appendChild(showCard);

// program to shuffle the deck of cards

// declare card elements
const suits = ["Spades", "Diamonds", "Club", "Heart"];
const values = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King",];

// empty array to contain cards
let deck = [];

// create a deck of cards
for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
        let card = { Value: values[x], Suit: suits[i] };
        deck.push(card);
    }
}

// shuffle the cards
for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
}

console.log('The first five cards are:');
// display 5 results
for (let i = 0; i < 5; i++) {
    console.log(`${deck[i].Value} of ${deck[i].Suit}`)
}



const foo = document.createElement('p');
foo.textContent = 'Cards go here';
showCard.appendChild(foo);

for (let i = 0; i < 5; i++) {
  const thisCard = document.createElement('p');
  thisCard.textContent = `${deck[i].Value} of ${deck[i].Suit}`;
  console.log('function working? ', thisCard);
  showCard.appendChild(thisCard);
  }
