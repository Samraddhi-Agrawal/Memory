const cards = document.querySelectorAll(".card");
const restartBtn = document.getElementById("restartBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const moveCounter = document.getElementById("moveCounter");
const themeSelector = document.getElementById("themeSelector");

let matched = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;
let moves = 0;

// Themes with images (8 unique images each)
const themes = {
  pokemon: [
    "1.png","2.png","3.png","4.png",
    "5.png","6.png","7.png","8.png"
  ],
  ben10: [
    "1.png","2.png","3.png","4.png",
    "5.png","6.png","7.png","8.png"
  ],
  taylor: [
    "1.png","2.png","3.png","4.png",
    "5.png","6.png","7.png","8.png"
  ]
};

// Helper to shuffle array in-place
function shuffleArray(array) {
  for(let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Update moves display
function updateMoves() {
  moves++;
  moveCounter.textContent = `Moves: ${moves}`;
}

// Reset moves display
function resetMoves() {
  moves = 0;
  moveCounter.textContent = `Moves: 0`;
}

// Reset turn state
function resetTurn() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
}

// Set images on cards based on theme, 2 copies of each image, shuffled
function setCardImages(theme) {
  matched = 0;
  resetMoves();
  resetTurn();
  disableDeck = false;

  // Create pairs of image names
  let imgs = [...themes[theme], ...themes[theme]];
  shuffleArray(imgs);

  cards.forEach((card, index) => {
    const img = card.querySelector(".back-view img");
    img.src = `Assets/${theme}/${imgs[index]}`;
    card.classList.remove("flipped");
    card.style.pointerEvents = "auto"; // enable clicking
  });
}

// Card click handler
function flipCard(e) {
  const clickedCard = e.currentTarget;
  if (disableDeck || clickedCard === cardOne || clickedCard.classList.contains("flipped")) return;

  clickedCard.classList.add("flipped");

  if (!cardOne) {
    cardOne = clickedCard;
    return;
  }

  cardTwo = clickedCard;
  disableDeck = true;
  updateMoves();

  const img1 = cardOne.querySelector("img").src;
  const img2 = cardTwo.querySelector("img").src;

  if (img1 === img2) {
    matched++;
    cardOne.style.pointerEvents = "none";
    cardTwo.style.pointerEvents = "none";
    resetTurn();

    if (matched === 8) {
      setTimeout(() => {
        alert("🎉 You found all matches!");
        setCardImages(themeSelector.value);
        cards.forEach(card => card.addEventListener("click", flipCard));
      }, 700);
    }
  } else {
    setTimeout(() => {
      cardOne.classList.remove("flipped");
      cardTwo.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

// Initialize
function init() {
  setCardImages(themeSelector.value);
  cards.forEach(card => card.addEventListener("click", flipCard));
  resetMoves();
}

// Event listeners for buttons
restartBtn.addEventListener("click", () => {
  setCardImages(themeSelector.value);
  cards.forEach(card => card.addEventListener("click", flipCard));
  resetMoves();
});

shuffleBtn.addEventListener("click", () => {
  setCardImages(themeSelector.value);
});

themeSelector.addEventListener("change", (e) => {
  setCardImages(e.target.value);
  cards.forEach(card => card.addEventListener("click", flipCard));
  resetMoves();
});

init();

function setCardImages(theme) {
  matched = 0;
  resetMoves();
  resetTurn();
  disableDeck = false;

  // Change body class for background theme
  document.body.classList.remove("pokemon", "ben10", "taylor");
  document.body.classList.add(theme);

  // Create pairs of image names
  let imgs = [...themes[theme], ...themes[theme]];
  shuffleArray(imgs);

  cards.forEach((card, index) => {
    const img = card.querySelector(".back-view img");
    img.src = `Assets/${theme}/${imgs[index]}`;
    card.classList.remove("flipped");
    card.style.pointerEvents = "auto";
  });
}
