let cards = [
  {
    name: "ghost",
    src: "./img/ghost.png",
  },
  {
    name: "hat",
    src: "./img/hat.png",
  },
  {
    name: "headstone",
    src: "./img/headstone.png",
  },
  {
    name: "jaw",
    src: "./img/jaw.png",
  },
  {
    name: "knife",
    src: "./img/knife.png",
  },
  {
    name: "pumpkin",
    src: "./img/pumpkin.png",
  },
  {
    name: "skull",
    src: "./img/skull.png",
  },
  {
    name: "zombie",
    src: "./img/zombie.png",
  },
];

const doubleCards = (cards) => [...cards, ...cards.slice()];
const shuffleCards = (cards) => cards.sort(() => 0.5 - Math.random());
const field = document.querySelector(".field");

cards = doubleCards(cards);

shuffleCards(cards);

function createCardsFromArr(arr) {
  let fragment = "";
  arr.forEach(({ name, src }) => {
    return (fragment += `<div class="card" data-name="${name}"><img src="${src}"></div>`);
  });
  field.innerHTML = fragment;
}

createCardsFromArr(cards);
cardsLength = cards.length;
console.log(cards.length);

field.addEventListener("click", function (e) {
  e.target.classList.add("active");
  let checkedCards = [];
  Array.from(field.children).forEach((item) => {
    item.classList.contains("active") ? checkedCards.push(item) : null;
  });
  if (checkedCards.length === 2) {
    const isEqual =
      checkedCards[0].dataset.name === checkedCards[1].dataset.name;
    if (isEqual) {
      cardsLength -= 2;
      checkedCards[0].style.opacity = 0;
      checkedCards[0].classList.remove("active");
      checkedCards[1].style.opacity = 0;
      checkedCards[1].classList.remove("active");
      checkedCards = [];
    } else {
      console.log(false);
    }
  }
  if (cardsLength === 0) {
    setTimeout(() => {
      alert("u are win!");
      shuffleCards(cards);
      createCardsFromArr(cards);
      cardsLength = cards.length;
    }, 0);
  }
});
