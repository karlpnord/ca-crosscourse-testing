import { cartLoad } from "./components/cartLoad.js";
import { saveCart } from "./components/cartSave.js";
import { cartAmount } from "./components/cartAmount.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if(id === null) {
   location.href = "/";
}

const url = "https://api.noroff.dev/api/v1/gamehub/" + id;

const container = document.querySelector(".grid-container");
const loadingContainer = document.querySelector(".loading");
const errorContainer = document.querySelector(".error");
const addToCartButton = document.querySelector(".add-to-cart");
const imageContainer = document.querySelector(".image-item");
const gameTitle = document.querySelector(".game-title");
const gameDescription = document.querySelector(".game-description");
const gamePrice = document.querySelector(".game-price");
const usability = document.querySelector(".usability");

cartAmount();

async function fetchGameProduct() {
   try {
      const response = await fetch(url);
      const game = await response.json();
      usability.style.display = "none";
      createHtml(game);
   } catch(error) {
      errorContainer.style.display = "block";
      errorContainer.innerHTML = "An error has occurred, please reload the page";
   }
}

function createHtml(game) {
   container.style.display = "grid";
   document.title = `GameHub - ${game.title}`;
   imageContainer.innerHTML = `<img src="${game.image}" alt="${game.description}">`;
   gameTitle.innerHTML = `${game.title}`;
   gameDescription.innerHTML = `${game.description}`;
   gamePrice.innerHTML = `${game.price}`;
}

fetchGameProduct();

addToCartButton.addEventListener("click", addToCart);
addToCartButton.addEventListener("click", buttonStyle);

function buttonStyle() {
   addToCartButton.innerText = "Added to Cart";
   addToCartButton.style.backgroundColor = "green";
}

function addToCart() {
   let cart = cartLoad("cart") || [];
   cart.push(id);
   saveCart("cart", cart);
   cartAmount();
}