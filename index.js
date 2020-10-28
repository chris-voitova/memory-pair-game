const doubleCards = (cards) => [...cards, ...cards.slice()];
const shuffleCards = (cards) => cards.sort(() => 0.5 - Math.random());
const field = document.querySelector(".field");

cards = doubleCards(cards);
shuffleCards(cards);

function createCardsFromArr(arr) {
  let fragment = "";
  arr.forEach(({ name, src }) => {
    return (fragment += `<div class="flip-container" data-name="${name}">
	 <div class="flipper">
		 <div class="front">
		 <img src="./img/pumpkin-front.png" class="front-img"/>
		 </div>
		 <div class="back">
		 <div class="card"><img src="${src}" /></div>
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
    target.classList.add("active");
    target.classList.add("flipped");

    let checkedCards = [];
    cardsInField = Array.from(field.children);

    cardsInField.forEach((item) => {
      item.classList.contains("active") ? checkedCards.push(item) : null;
    });
    if (checkedCards.length === 2) {
      checkedCards.reduce((first, curr, index, arr) => {
        if (first.dataset.name === curr.dataset.name) {
          cardsLength -= 2;
          arr.forEach((item) => {
            item.classList.remove("active", "card");
            item.classList.add("hidden");
          });
          checkedCards = [];
        } else {
          arr.forEach((item) => item.classList.remove("active"));
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
