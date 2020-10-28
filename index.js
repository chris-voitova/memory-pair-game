let cards = [
  "ghost",
  "hat",
  "headstone",
  "jaw",
  "knife",
  "pumpkin",
  "skull",
  "zombie",
];

const doubleCards = (cards) => [...cards, ...cards.slice()];
const shuffleCards = (cards) => cards.sort(() => 0.5 - Math.random());
const field = document.querySelector(".field");

cards = doubleCards(cards);
shuffleCards(cards);

function createCardsFromArr(arr) {
  let fragment = "";
  arr.forEach((img) => {
    return (fragment += `<div class="flip-container" data-name="${img}">
	 <div class="flipper">
		 <div class="front">
		 <img src="./img/pumpkin-front.png" class="front-img"/>
		 </div>
		 <div class="back">
		 <div class="card"><img src="./img/${img}.png" /></div>
		 </div>
	 </div>
	</div>`);
  });
  field.innerHTML = fragment;
}

createCardsFromArr(cards);
let cardsLength = cards.length;

field.addEventListener("click", function (e) {
  const target = e.target;

  if (target.classList.contains("flip-container")) {
    target.classList.remove("active", "flipped");
    target.classList.add("active", "flipped");

    let checkedCards = [];
    cardsInField = Array.from(field.children);

    cardsInField.forEach((item) => {
      item.classList.contains("active") ? checkedCards.push(item) : null;
    });
    if (checkedCards.length === 2) {
      checkedCards.reduce((first, curr, index, arr) => {
        if (first.dataset.name === curr.dataset.name) {
          cardsLength -= 2;
          setTimeout(
            () =>
              arr.forEach((item) => {
                item.classList.remove("active");
                item.classList.add("hidden");
              }),
            1000
          );
          checkedCards = [];
        } else {
          arr.forEach((item) => item.classList.remove("active")),
            setTimeout(
              () => arr.forEach((item) => item.classList.remove("flipped")),
              1000
            );
          checkedCards = [];
        }
      });
    }
    if (cardsLength === 0) {
      setTimeout(() => {
        alert("u are win!");
        shuffleCards(cards);
        createCardsFromArr(cards);
        cardsLength = cards.length;
      });
    }
  }
});
