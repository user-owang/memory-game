const gameContainer = document.getElementById("game");
const buttonSlot = document.querySelector('.buttonSlot');
const currentScore = document.querySelector('.score');
let moveCounter = 0;
let ready = true;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    
  }
  currentScore.innerText = 'Your Current Score is:'
  buttonSlot.innerHTML = '<button id="reset">Reset</button>';
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', resetFunction);
}

// TODO: Implement this function!
let choice1 = undefined
let matchedPairs = 0
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (ready && !event.target.classList.contains('flipped')){
    event.target.style.backgroundColor = event.target.classList[0];
    if (choice1 === undefined) {
      choice1 = event.target;
      event.target.classList.add('flipped')
    } else if(choice1 !== undefined){
      let choice2= event.target
      choice2.classList.add('flipped')
      ready = false;
      if(choice2.classList.value === choice1.classList.value){
        choice1.classList.add('matched');
        choice2.classList.add('matched');
        matchedPairs++;
      } else {
        choice1.classList.remove('flipped');
        choice2.classList.remove('flipped');
        setTimeout(function(){
          choice1.style.backgroundColor = '';
          choice2.style.backgroundColor = '';
        },500)
      }
      moveCounter++;
      setTimeout(function(){
        choice1 = undefined;
        choice2 = undefined;
        ready = true;
      },500)
      currentScore.innerText = `Your Current Score is: ${moveCounter}`;
    }
  }
  if (matchedPairs * 2 === COLORS.length){
    alert('You Win!');
    if (localStorage.HighScore === undefined){
      localStorage.setItem('HighScore', `${moveCounter}`);
      highScoreDisplay.innerText = `High Score: ${localStorage.HighScore}`;
    } else if(moveCounter< parseInt(localStorage.HighScore)){
      localStorage.setItem('HighScore', `${moveCounter}`);
      highScoreDisplay.innerText = `High Score: ${localStorage.HighScore}`;
    }
  }
}

// when the DOM loads
function setUp(){
  buttonSlot.innerHTML = '<button id="play">Play!</button>';
  const playButton = document.getElementById('play');
  playButton.addEventListener('click', function() {
    createDivsForColors(shuffledColors);
    highScoreDisplay.innerText = `High Score: ${localStorage.HighScore}`;
  });
}
setUp();
//reset function
function resetFunction() {
  matchedPairs = 0;
  moveCounter = 0;
  currentScore.innerText = '';
  gameContainer.innerHTML = '';
  shuffledColors = shuffle(COLORS);
  setUp();
}
//show High Score
const highScoreDisplay = document.querySelector('.highScore');
highScoreDisplay.innerText = `High Score: ${localStorage.HighScore}`;