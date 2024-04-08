const moves = document.getElementById("movesCount");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Items array
const items = [
  {name:"chicken", image:"/media/memory/chicken.png"},
  {name:"cow", image:"/media/memory/cow.png"},
  {name:"crab", image:"/media/memory/crab.png"},
  {name:"fox", image:"/media/memory/fox.png"},
  {name:"hedgehog", image:"/media/memory/hedgehog.png"},
  {name:"hippo", image:"/media/memory/hippo.png"},
  {name:"koala", image:"/media/memory/koala.png"},
  {name:"lemur", image:"/media/memory/lemur.png"},
  {name:"pig", image:"/media/memory/pig.png"},
  {name:"tiger", image:"/media/memory/tiger.png"},
  {name:"whale", image:"/media/memory/whale.png"},
  {name:"zebra", image:"/media/memory/zebra.png"},
];

// Initial Time
let seconds = 0,
  minutes = 0;
// Initial moves and win count
let movesCount = 0,
  winCount = 0;

// For timer
const timeGenerator = () => {
  seconds+= 1;
  // minutes logic
  if(seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  // format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValues = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size= (size * size) / 2;
  //Random object selection
  for(let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for(let i=0; i < size*size; i++){
    /*
      Create Cards
      before => front side (contains question mark)
      after => back side (container actual image);
      data-card-values is a custom attribute which
      stores the names of the cards to match later
    */
  gameContainer.innerHTML +=`
    <div class="card-container" data-card-value="${cardValues[i].name}">
      <div class="card-before">?</div>
      <div class="card-after">
      <img src="${cardValues[i].image}" class="image"/></div>
    </div>
    `;
  }
};

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

initializer();