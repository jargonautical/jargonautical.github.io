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
      console.log(i,j);
      //console.log('your card is: ', temp);
      return temp;
  }
}

let arcCards = [];
function getArcCards() {
  // declare card elements
  const suits = ["arc_collapse", "arc_discipline", "arc_grow", "arc_transform"];
  const values = ["aCentury","aDecade","aFewYears","aGeneration","aMillennium","twoGenerations",];
  // create arc cards
  for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
          let card = { Value: values[x], Suit: suits[i] };
          arcCards.push(card);
      }
  }
  //console.log('arcCards deck: ', arcCards);
}

let moodCards = [];
function getMoodCards() {
  // declare card elements
  const suits = ["mood"];
  const values = [
    "admiration","alienation","amusement","anger","anxiety","awkwardness",
    "calm","charm","cheer","contentment","curiosity",
    "decadence","delight","dignity","disgust","dread",
    "embarrassment","excitement","exhilaration",
    "fascination","fervor","frustration",
    "gratitude","happiness","hilarity","hope","longing",
    "malaise","melancholy","melodrama","nostalgia","optimism","outrage",
    "pathos","pleasure","pride","rationality","relief","resentment","respect",
    "sadness","satisfaction","serenity","shame","shock","sorrow","surprise",
    "unease","warmth","weirdness","wellbeing","wonder","worry","zen",
  ];
  // create mood cards
  for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
          let card = { Value: values[x], Suit: suits[i] };
          moodCards.push(card);
      }
  }
  //console.log('moodCards deck: ', moodCards);
}

let objectCards = [];
function getObjectCards() {
  // declare card elements
  const suits = ["object"];
  const values = [
    "advertisement","artwork","beverage","book","bottle","box","brochure",
    "building","candy","clothing","corporation","device","document","event",
    "festival","flag","game","gift","headline","implant","instrument",
    "jewellery","kit","law","logo","lotion","machine","magazineCover","map",
    "mask","monument","passport","pill","plant","postcard","poster","product",
    "prosthetic","publicServiceAnnouncement","relic","ritual","show","slogan",
    "snack","song","souvenir","statue","sticker","symbol","tattoo","tool","toy",
    "tShirt","vehicle","video","weapon","wildcard",
  ];
  // create object cards
  for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
          let card = { Value: values[x], Suit: suits[i] };
          objectCards.push(card);
      }
  }
  //console.log('objectCards deck: ', objectCards);
}

let terrainCards = [];
function getTerrainCards() {
  // declare card elements
  const suits = ["terrain"];
  const values = [
    "agriculture","childhood","citizenship","class","climate","cloning",
    "communications","court","disease","drones","education","entertainment",
    "environment","equality","family","fashion","flight","forests","gender",
    "genetics","governance","health","hobbies","home","identity","insects",
    "intellectualProperty","journalism","justice","learning","memory","mining",
    "music","oceans","oil","oldAge","pets","power","religion","robots","sex",
    "shopping","space","sports","theatre","theBrain","theEconomy","theMoon",
    "theZoo","travel","war","water","wealth","wildcard","woman","work","zombies",
  ];
  // create terrain cards
  for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
          let card = { Value: values[x], Suit: suits[i] };
          terrainCards.push(card);
      }
  }
  //console.log('terrainCards deck: ', terrainCards);
}

getArcCards();
getMoodCards();
getObjectCards();
getTerrainCards();

const arcWild = document.createElement('img');
arcWild.setAttribute("src", "cards/arc_collapse_aCentury.png");
showCard1.appendChild(arcWild);

const moodWild = document.createElement('img');
moodWild.setAttribute("src", "cards/mood_zen.png");
showCard2.appendChild(moodWild);

const objectWild = document.createElement('img');
objectWild.setAttribute("src", "cards/object_wildcard.png");
showCard3.appendChild(objectWild);

const terrainWild = document.createElement('img');
terrainWild.setAttribute("src","cards/terrain_wildcard.png");
showCard4.appendChild(terrainWild);

function dealCards() {
  var arcCard = shuffle(arcCards);
  var moodCard = shuffle(moodCards);
  var objectCard = shuffle(objectCards);
  var terrainCard = shuffle(terrainCards);
  console.log(arcCard, moodCard, objectCard, terrainCard);

  // build arc card container
  const placeArcCard = document.createElement('img');
  var arcPicSrc = `cards/${arcCard.Suit}_${arcCard.Value}.png`;
  console.log(arcPicSrc);
  placeArcCard.setAttribute("src", arcPicSrc);
  showCard1.replaceChildren(placeArcCard);

  // build mood card container
  const placeMoodCard = document.createElement('img');
  var moodPicSrc = `cards/${moodCard.Suit}_${moodCard.Value}.png`;
  console.log(moodPicSrc);
  placeMoodCard.setAttribute("src", moodPicSrc);
  showCard2.replaceChildren(placeMoodCard);

  // build object card container
  const placeObjectCard = document.createElement('img');
  var objectPicSrc = `cards/${objectCard.Suit}_${objectCard.Value}.png`;
  console.log(objectPicSrc);
  placeObjectCard.setAttribute("src", objectPicSrc);
  showCard3.replaceChildren(placeObjectCard);

  // build terrain card container
  const placeTerrainCard = document.createElement('img');
  var terrainPicSrc = `cards/${terrainCard.Suit}_${terrainCard.Value}.png`;
  console.log(terrainPicSrc);
  placeTerrainCard.setAttribute("src", terrainPicSrc);
  showCard4.replaceChildren(placeTerrainCard);
}
